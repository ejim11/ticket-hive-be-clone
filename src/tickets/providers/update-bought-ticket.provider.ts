import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Ticket } from '../ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketStatus } from '../enums/ticket-status.enum';
import { User } from 'src/users/user.entity';

/**
 * update bought ticket provider class
 */
@Injectable()
export class UpdateBoughtTicketProvider {
  /**
   * constructor
   * @param ticketsRepository
   */
  constructor(
    /**
     * injecting ticket repo
     */
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
  ) {}

  /**
   * function for updating ticket after user pays
   * @param ticketId
   * @param user
   * @returns updated ticket
   */
  public async updateTicket(ticketId: number, user: User) {
    let ticket;
    // find the ticket
    try {
      ticket = await this.ticketsRepository.findOneBy({
        id: +ticketId,
      });
    } catch (err) {
      throw new RequestTimeoutException(err);
    }
    if (!ticket) {
      throw new BadRequestException('Ticket id does not exist');
    }
    // modify the ownerId and ticketStatus fields
    ticket.owner = user;
    ticket.ticketStatus = TicketStatus.SOLD;
    try {
      await this.ticketsRepository.save(ticket);
    } catch (error: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return ticket;
  }
}
