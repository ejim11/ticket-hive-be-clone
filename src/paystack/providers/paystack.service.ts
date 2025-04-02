import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import paystackConfig from '../config/paystack.config';
import axios from 'axios';
import * as crypto from 'crypto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { TicketsService } from 'src/tickets/providers/tickets.service';
import { MailService } from 'src/mail/providers/mail.service';
import { UploadsService } from 'src/uploads/providers/uploads.service';
import { DataSource } from 'typeorm';
import { Payment } from '@/payments/payment.entity';
import { paymentStatus } from '@/payments/enums/paymentStatus.enum';
import { TicketStatus } from '@/tickets/enums/ticket-status.enum';

/**
 * service for the paystack module
 */
@Injectable()
export class PaystackService {
  /**
   * constructor
   * @param paystackConfiguration
   * @param configService
   * @param ticketsService
   * @param mailService
   * @param uploadsService
   */
  constructor(
    /**
     * injecting the paystack config
     */
    @Inject(paystackConfig.KEY)
    private readonly paystackConfiguration: ConfigType<typeof paystackConfig>,

    /**
     * injecting config service
     */
    private readonly configService: ConfigService,

    /**
     * injecting the ticket service
     */
    private readonly ticketsService: TicketsService,

    /**
     * injecting the mail service
     */
    private readonly mailService: MailService,

    /**
     * injecting the uploads service
     */
    private readonly uploadsService: UploadsService,

    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,
  ) {}

  /**
   * @function for getting the auth header
   * @returns authorization header for paystack
   */
  private getAuthHeader() {
    return { Authorization: `Bearer ${this.paystackConfiguration.secret}` };
  }

  /**
   * function for initializing the payment
   * @param paymentDto
   * @param user
   * @returns paylink url and access code
   */
  public async initializePayment(paymentDto: any, user: ActiveUserData) {
    // the payment dto is an array
    // start transaction
    // create Query Runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // connect query runner to datasource
      await queryRunner.connect();
      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to datasource');
    }
    // modify tickets
    // start payment
    // verify payment
    // revert if their is failure in payment

    try {
      const { buyer, tickets, totalAmount, eventName } =
        await this.ticketsService.getTickets(queryRunner, paymentDto, user);

      let response;

      if (totalAmount > 0) {
        try {
          response = await axios.post(
            `${this.paystackConfiguration.baseUrl}/transaction/initialize`,
            {
              email: buyer.email,
              metadata: {
                tickets: tickets,
                user: buyer,
                eventName,
                totalAmount,
              },
              amount: totalAmount * 100,
              callback_url: `${this.configService.get('appConfig.host')}/events/${paymentDto.eventId}/get-ticket?bought=yes`,
            }, // Paystack accepts amounts in kobo
            { headers: this.getAuthHeader() },
          );

          // Create payment record
          await queryRunner.manager.save(Payment, {
            userId: buyer.id,
            eventId: paymentDto.eventId,
            amount: totalAmount,
            provider: 'paystack',
            providerReference: response.data.data.reference,
            status: paymentStatus.PENDING,
            authorizationUrl: response.data.data.authorization_url,
            tickets,
          });

          // Update tickets status to locked
          await this.ticketsService.updateTicketsStatus(
            queryRunner.manager,
            tickets.map((ticket) => ticket.id),
            TicketStatus.LOCKED,
          );
        } catch (error) {
          throw new ConflictException(error);
        }
      } else {
        // Update tickets to sold
        await this.ticketsService.updateTicketsStatus(
          queryRunner.manager,
          tickets.map((t) => t.id),
          TicketStatus.SOLD,
          buyer,
        );

        console.log('creating pdfs...');

        const pdfs = await Promise.all(
          tickets.map(
            async (ticket) =>
              await this.ticketsService.generateTicketPdf(
                String(ticket.id),
                ticket.type,
                eventName,
                ticket.price,
              ),
          ),
        );

        const urls = await Promise.all(
          pdfs.map(
            async (pdf, i: number) =>
              await this.uploadsService.uploadTicketFile(
                pdf,
                String(tickets[i].id),
              ),
          ),
        );

        try {
          await this.mailService.sendTicketBuyerMail(
            buyer,
            totalAmount,
            eventName,
            tickets,
            urls,
          );
        } catch (err) {
          throw new ConflictException(err);
        }
      }

      // if successful commit
      // ensures the txn is committed to the db
      await queryRunner.commitTransaction();

      return response
        ? response.data
        : { message: 'Tickets bought successfully' };
    } catch (error) {
      // we rollback the txn here if it is not successful
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // relsease the connection
      // release connection whether it was successful or not
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }
  }

  /**
   * function for verifying the payment
   * @param reference
   * @returns data after payment
   */
  public async verifyPayment(reference: string) {
    // create Query Runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      // connect query runner to datasource
      await queryRunner.connect();
      // start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to datasource');
    }
    try {
      const response = await axios.get(
        `${this.paystackConfiguration.baseUrl}/transaction/verify/${reference}`,
        { headers: this.getAuthHeader() },
      );
      const { tickets, user, eventName, totalAmount } =
        response.data.data.metadata;

      // Get purchase by payment reference
      const payment = await queryRunner.manager.findOne(Payment, {
        where: { providerReference: reference },
      });

      if (!payment) {
        throw new Error('Purchase not found');
      }

      if (response.data.data.status === 'success') {
        // Update payment status
        payment.status = paymentStatus.SUCCESS;

        // Update tickets to sold
        await this.ticketsService.updateTicketsStatus(
          queryRunner.manager,
          tickets.map((t) => t.id),
          TicketStatus.SOLD,
          user,
        );
      } else {
        // Payment failed
        payment.status = paymentStatus.FAILED;

        // Release tickets back to available
        await this.ticketsService.updateTicketsStatus(
          queryRunner.manager,
          tickets.map((t) => t.id),
          TicketStatus.UNSOLD,
        );
      }

      console.log('creating pdfs...');

      const pdfs = await Promise.all(
        tickets.map(
          async (ticket) =>
            await this.ticketsService.generateTicketPdf(
              ticket.id,
              ticket.type,
              eventName,
              ticket.price,
            ),
        ),
      );

      const urls = await Promise.all(
        pdfs.map(
          async (pdf, i: number) =>
            await this.uploadsService.uploadTicketFile(pdf, tickets[i].id),
        ),
      );

      console.log('urls: ', urls);

      // Save updated paymet
      await queryRunner.manager.save(Payment, payment);

      await queryRunner.commitTransaction();

      try {
        await this.mailService.sendTicketBuyerMail(
          user,
          totalAmount,
          eventName,
          tickets,
          urls,
        );
      } catch (err) {
        throw new ConflictException(err);
      }

      return response.data;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // relsease the connection
      // release connection whether it was successful or not
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }
  }

  /**
   * function called by paystack server after user pays
   * @param body
   * @param signature
   * @param req
   * @returns reference for payment
   */
  public async paymentWebhook(body: any, signature: string, req: any) {
    const hash = crypto
      .createHmac('sha512', this.paystackConfiguration.secret)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== signature) {
      throw new HttpException('Invalid signature', HttpStatus.FORBIDDEN);
    }

    const { data, event } = body;

    if (event !== 'charge.success') {
      throw new HttpException('Invalid event type', HttpStatus.BAD_REQUEST);
    }

    const paymentData = await this.verifyPayment(data.reference);
    console.log('Payment successful:', paymentData);
    if (paymentData.data.status === 'success') {
      return { message: 'Payment verified and processed successfully' };
    } else {
      throw new HttpException(
        'Payment verification failed',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
