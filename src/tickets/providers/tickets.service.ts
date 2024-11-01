import { Injectable } from '@nestjs/common';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { BuyTicketProvider } from './buy-ticket.provider';
import { User } from 'src/users/user.entity';
import { UpdateBoughtTicketProvider } from './update-bought-ticket.provider';
import { GenerateTicketPdfProvider } from './generate-ticket-pdf.provider';
import { PaymentDto } from '@/paystack/dtos/payment.dto';
import { EntityManager, QueryRunner } from 'typeorm';
import { TicketStatus } from '../enums/ticket-status.enum';
import { Ticket } from '../ticket.entity';

/**
 * service class for the tickets module
 */
@Injectable()
export class TicketsService {
  /**
   * constructor
   * @param buyTicketProvider
   */
  constructor(
    /**
     * injecting the buy ticket provider
     */
    private readonly buyTicketProvider: BuyTicketProvider,

    /**
     * injecting the update bought ticket provider
     */
    private readonly updateBoughtTicketProvider: UpdateBoughtTicketProvider,

    /**
     * injecting the generate ticket pdf
     */
    private readonly generateTicketPdfProvider: GenerateTicketPdfProvider,
  ) {}

  /**
   * function for buying ticket
   * @param patchTicketDto
   * @param user
   * @returns initialized payment link of ticket
   */
  public async getTickets(
    queryRunner: QueryRunner,
    body: PaymentDto,
    user: ActiveUserData,
  ) {
    return this.buyTicketProvider.buyTicket(queryRunner, body, user);
  }

  /**
   * function for updating ticket status
   * @param entityManager
   * @param ticketIds
   * @param status
   */
  public async updateTicketsStatus(
    entityManager: EntityManager,
    ticketIds: number[],
    status: TicketStatus,
    user?: User,
  ) {
    const setData = user
      ? { ticketStatus: status, owner: user }
      : { ticketStatus: status };

    await entityManager
      .createQueryBuilder()
      .update(Ticket)
      .set(setData)
      .where('id IN (:...ids)', { ids: ticketIds })
      .execute();
  }

  /**
   * function for modifying the the ticket after a purchase
   * @param ticketId
   * @param user
   * @returns updated ticket info
   */
  public async updateTicket(ticketId: number, user: User) {
    return this.updateBoughtTicketProvider.updateTicket(ticketId, user);
  }

  /**
   * function for generating the ticket pdf
   * @param id
   * @param type
   * @param eventName
   * @param amount
   * @returns ticket pdf
   */
  public async generateTicketPdf(
    id: string,
    type: string,
    eventName: string,
    amount: number,
  ) {
    return await this.generateTicketPdfProvider.generateTicketPDF({
      id,
      type,
      eventName,
      amount,
    });
  }
}
