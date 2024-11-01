import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../event.entity';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { GetEventsDto } from '../dtos/get-events.dto';
import { UsersService } from 'src/users/providers/users.service';

/**
 * provider class for the the get user events
 */
@Injectable()
export class GetUserEventsProvider {
  /**
   * constructor
   * @param eventsRepository
   * @param paginationProvider
   * @param usersService
   */
  constructor(
    /**
     * injecting the events repository
     */
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,

    /**
     * injecting the paginationation provider
     */
    private readonly paginationProvider: PaginationProvider,

    /**
     * injecting the users service
     */
    private readonly usersService: UsersService,
  ) {}

  /**
   * function for getting events from a user
   * @param userId
   * @param eventQuery
   * @returns events created by  a user
   */
  public async getUserEvents(
    userId: string,
    eventQuery: GetEventsDto,
  ): Promise<Paginated<Event>> {
    await this.usersService.findOneById(+userId);

    const options = {
      where: {
        owner: {
          id: userId,
        },
      },
    };

    try {
      const events = await this.paginationProvider.paginationQuery(
        {
          limit: eventQuery.limit,
          page: eventQuery.page,
        },
        this.eventsRepository,
        options,
      );

      return events;
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(error);
    }
  }
}
