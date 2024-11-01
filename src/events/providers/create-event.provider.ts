import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateEventDto } from '../dtos/create-event.dto';
import { DataSource } from 'typeorm';
import { Event } from '../event.entity';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Ticket } from 'src/tickets/ticket.entity';
import { UploadsService } from 'src/uploads/providers/uploads.service';

/**
 * provider for creating an event
 */
@Injectable()
export class CreateEventProvider {
  /**
   * constructor
   * @param usersService
   * @param dataSource
   * @param uploadsService
   */
  constructor(
    /**
     * injecting users service
     */
    private readonly usersService: UsersService,

    /**
     * Injecting datasource
     */
    private readonly dataSource: DataSource,

    /**
     * injecting the uploads service
     */
    private readonly uploadsService: UploadsService,
  ) {}

  /**
   * function for creating an event
   * @param createEventDto
   * @param user
   * @param file
   * @returns the created event
   */
  public async createEvent(
    createEventDto: CreateEventDto,
    user: ActiveUserData,
    file: Express.Multer.File,
  ) {
    // find the creator (owner of the event)
    let owner;
    const newTickets: Ticket[] = [];
    try {
      owner = await this.usersService.findOneById(user.sub);
    } catch (error) {
      throw new ConflictException(error);
    }
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
    const imageUrl = await this.uploadsService.uploadFile(file);
    // upload the event image url to the db
    try {
      // create event
      const event = queryRunner.manager.create(Event, {
        ...createEventDto,
        owner,
        image: imageUrl,
      });
      // saving event
      const eventResult = await queryRunner.manager.save(event);
      for (const ticket of createEventDto.tickets) {
        /**
         * param
         * entity
         * dto
         */
        const newTicket = queryRunner.manager.create(Ticket, {
          ...ticket,
          event: eventResult,
        });
        const ticketResult = await queryRunner.manager.save(newTicket);
        newTickets.push(ticketResult);
      }
      // if successful commit
      // ensures the txn is committed to the db
      await queryRunner.commitTransaction();
      return { event: eventResult };
    } catch (error) {
      // if unsuccessful rollback
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
}
