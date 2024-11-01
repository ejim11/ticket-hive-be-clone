import { ConflictException, Injectable, Scope } from '@nestjs/common';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Ticket } from '../ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { EventsService } from 'src/events/providers/events.service';
import { PaymentDto } from '@/paystack/dtos/payment.dto';
import { TicketStatus } from '../enums/ticket-status.enum';

/**
 * provider class for buying ticket
 */
@Injectable({ scope: Scope.DEFAULT })
export class BuyTicketProvider {
  /**
   * constructor
   * @param ticketRepository
   * @param usersService
   */
  constructor(
    /**
     * injecting the ticket repository
     */
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    /**
     * injecting the users service
     */
    private readonly usersService: UsersService,

    /**
     * injecting the events service
     */
    private readonly eventsService: EventsService,
  ) {}

  /**
   * function for modying the ticket when it bought
   * @param patchTicketDto
   * @param user
   * @returns modified ticket
   */
  public async buyTicket(
    queryRunner: QueryRunner,
    paymentDto: PaymentDto,
    user: ActiveUserData,
  ) {
    // body -  eventId, ticketType

    // find the user
    const ticketBuyer = await this.usersService.findOneById(user.sub);

    // find the event
    const event = await this.eventsService.findEventById(
      String(paymentDto.eventId),
    );

    // find how many tickets are left of the particular type
    const { tickets } = event;

    const ticketsToBeBought: any[] = paymentDto.ticketTypes
      .map((ticketType) => ({
        quamtity: ticketType.quantity,
        type: ticketType.ticket.type,
      }))
      .map((item) => {
        return tickets.filter(
          (ticket) =>
            ticket.type === item.type &&
            ticket.ticketStatus === TicketStatus.UNSOLD,
        );
      })
      .map((item, i) => {
        if (item.length < paymentDto.ticketTypes[i].quantity) {
          throw new ConflictException(
            `There are no more ${paymentDto.ticketTypes[i].ticket.type} tickets available `,
          );
        } else {
          return item.slice(0, paymentDto.ticketTypes[i].quantity);
        }
      })
      .flat()
      .map((item) => item.id);

    // lock tickets

    // Step 1: Lock and verify tickets
    const lockedTickets = await this.lockTickets(
      queryRunner,
      ticketsToBeBought,
    );

    const totalAmount = this.calculateTotal(lockedTickets);

    // const allUnsoldTicketsWithTicketType = tickets
    //   .filter(
    //     (ticket) => ticket.type.toLowerCase() === body.ticketTypes.toLowerCase(),
    //   )
    //   .filter((ticket) => ticket.ticketStatus === 'unsold');

    // if (allUnsoldTicketsWithTicketType.length <= 0) {
    //   throw new NotFoundException('No more tickets of the type');
    // }

    return {
      buyer: {
        firstName: ticketBuyer.firstName,
        lastName: ticketBuyer.lastName,
        email: ticketBuyer.email,
        id: ticketBuyer.id,
      },
      tickets: lockedTickets,
      totalAmount: totalAmount,
      eventName: event.name,
    };
  }

  /**
   * function for locking tickets
   * @param queryRunner
   * @param ticketIds
   * @returns locked tickets
   */
  private async lockTickets(queryRunner: QueryRunner, ticketIds: number[]) {
    const tickets = await queryRunner.manager
      .createQueryBuilder(Ticket, 'ticket')
      .setLock('pessimistic_write')
      .where('ticket.id IN (:...ids)', { ids: ticketIds })
      .getMany();

    if (tickets.length !== ticketIds.length) {
      throw new Error('Some tickets not found');
    }

    return tickets;
  }

  /**
   * function  for calculating the total price of the tickets
   * @param tickets
   * @returns total price of the tickets
   */
  private calculateTotal(tickets: Ticket[]): number {
    return tickets.reduce((sum, ticket) => sum + Number(ticket.price), 0);
  }
}
