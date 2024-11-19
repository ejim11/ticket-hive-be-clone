import { Injectable, NotFoundException } from '@nestjs/common';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { BuyTicketProvider } from './buy-ticket.provider';
import { User } from 'src/users/user.entity';
import { UpdateBoughtTicketProvider } from './update-bought-ticket.provider';
import { GenerateTicketPdfProvider } from './generate-ticket-pdf.provider';
import { PaymentDto } from '@/paystack/dtos/payment.dto';
import { Between, EntityManager, QueryRunner, Repository } from 'typeorm';
import { TicketStatus } from '../enums/ticket-status.enum';
import { Ticket } from '../ticket.entity';
import { EventsService } from '@/events/providers/events.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from '@/common/pagination/providers/pagination.provider';
import { GetTicketDto } from '../dtos/get-tickets.dto';
import getMonthDateRange from '@root/utils/getMonthRanges';

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

    /**
     * injecting the events service
     */
    private readonly eventsService: EventsService,

    /**
     * injecting tickets repository
     */
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,

    /**
     * injecting pagination pprovider
     */
    private readonly paginationprovider: PaginationProvider,
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
    user?: Partial<User>,
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

  public async getOwnerTickets(userId: number, ticketQuery: GetTicketDto) {
    // find all events for owner
    const events = await this.eventsService.findAllEventsByUserId(userId);

    // extract all tickets
    const eventsId = events.map((event) => ({
      id: event.id,
    }));

    const monthRange =
      ticketQuery['month'] && getMonthDateRange(ticketQuery['month']);

    try {
      const tickets = await this.paginationprovider.paginationQuery(
        {
          limit: 100,
          page: 1,
        },
        this.ticketsRepository,
        {
          relations: ['event', 'owner'],
          select: {
            event: {
              name: true,
            },
            owner: {
              email: true,
            },
          },
          where: {
            event: eventsId,
            createdAt: monthRange
              ? Between(monthRange.start, monthRange.end)
              : null,
          },
        },
      );

      const formattedTickets = tickets.data.map((tic) => {
        const owner = tic.owner ? tic.owner.email : null;
        return {
          id: tic.id,
          type: tic.type,
          price: tic.price,
          summary: tic.summary,
          createdAt: tic.createdAt,
          updatedAt: tic.updatedAt,
          ticketStatus: tic.ticketStatus,
          event: { name: tic.event.name },
          owner: { email: owner },
        };
      });

      return {
        data: formattedTickets,
        metadata: tickets.meta,
        links: tickets.links,
      };
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
