import {
  ConflictException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateEventProvider } from './create-event.provider';
import { CreateEventDto } from '../dtos/create-event.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { In, Repository, Between } from 'typeorm';
import { Event } from '../event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetEventsDto } from '../dtos/get-events.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { getDateRanges } from '@root/utils/getDateRanges';
import getMonthDateRange from '@root/utils/getMonthRanges';

/**
 * service provider for the event module
 */
@Injectable()
export class EventsService {
  /**
   * constructor
   * @param createEventsProvider
   * @param eventsRepository
   * @param paginationprovider
   */
  constructor(
    /**
     * injecting the create event provider
     */
    private readonly createEventsProvider: CreateEventProvider,

    /**
     * injecting the events repository
     */
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,

    /**
     * injecting the pagination provider
     */
    private readonly paginationprovider: PaginationProvider,
  ) {}

  /**
   * function for creating events
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
    return await this.createEventsProvider.createEvent(
      createEventDto,
      user,
      file,
    );
  }

  /**
   * function for deleting events
   * @param id
   * @returns message on whether delete was successful
   */
  public async deleteEvent(id: number) {
    try {
      await this.eventsRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return {
      message: 'Event deleted successfully',
    };
  }

  /**
   * function for getting all events
   * @param eventQuery
   * @returns all events
   */
  public async findAll(eventQuery: GetEventsDto): Promise<Paginated<Event>> {
    const { limit, page } = eventQuery;

    let whereOptions = [];

    const {
      todayStart,
      todayEnd,
      tomorrowStart,
      tomorrowEnd,
      weekendStart,
      weekendEnd,
      next7DaysStart,
      next7DaysEnd,
      next30DaysStart,
      next30DaysEnd,
    }: any = getDateRanges();

    const dateMaps = {
      today: Between(todayStart, todayEnd),
      tomorrow: Between(tomorrowStart, tomorrowEnd),
      thisweekend: Between(weekendStart, weekendEnd),
      next7days: Between(next7DaysStart, next7DaysEnd),
      next30days: Between(next30DaysStart, next30DaysEnd),
    };

    const monthRange =
      eventQuery['month'] && getMonthDateRange(eventQuery['month']);

    Object.keys(eventQuery).forEach((key) => {
      if (key === 'limit' || key === 'page' || !eventQuery[key]) {
        return;
      }

      if (key === 'date') {
        const dateQueries = eventQuery['date'].split(',');

        whereOptions = dateQueries.map((item: string) => {
          return {
            eventStartDate: dateMaps[item],
          };
        });
      }

      if (whereOptions.length === 0) {
        whereOptions = [
          {
            category: eventQuery['category']
              ? In(eventQuery['category'].slice().split(','))
              : null,
            priceType: eventQuery['price']
              ? In(eventQuery['price'].slice().split(','))
              : null,
            attendanceMode: eventQuery['attendance']
              ? In(eventQuery['attendance'].slice().split(','))
              : null,
            name: eventQuery['name']
              ? eventQuery['name'].slice().split('-').join(' ')
              : null,
            owner: eventQuery['owner'] ? { id: eventQuery['owner'] } : null,
            createdAt: monthRange
              ? Between(monthRange.start, monthRange.end)
              : null,
          },
        ];
      } else {
        whereOptions = whereOptions.map((item) => ({
          ...item,
          category: eventQuery['category']
            ? In(eventQuery['category'].slice().split(','))
            : null,
          priceType: eventQuery['price']
            ? In(eventQuery['price'].slice().split(','))
            : null,
          attendanceMode: eventQuery['attendance']
            ? In(eventQuery['attendance'].slice().split(','))
            : null,
          name: eventQuery['name']
            ? eventQuery['name'].slice().split('-').join(' ')
            : null,
          owner: eventQuery['owner'] ? { id: eventQuery['owner'] } : null,
          createdAt: monthRange
            ? Between(monthRange.start, monthRange.end)
            : null,
        }));
      }
    });

    const checkWhereOptions = Object.keys(whereOptions).length;

    const options = {
      relations: ['owner'],
      select: {
        owner: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      },
      where: checkWhereOptions ? whereOptions : null,
    };

    try {
      const events = await this.paginationprovider.paginationQuery(
        {
          limit: limit,
          page: page,
        },
        this.eventsRepository,
        options,
      );

      return events;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  /**
   * function to get event by id
   * @param eventId
   * @returns event by id
   */
  public async findEventById(eventId: string): Promise<Event> {
    try {
      const event = await this.eventsRepository.findOneBy({
        id: +eventId,
      });

      if (!event) {
        throw new NotFoundException(`Event with ${eventId}  not found`);
      }

      return event;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * finds all events by ownerId
   * @param userId
   * @returns events
   */
  public async findAllEventsByUserId(userId: number) {
    try {
      const events = await this.eventsRepository.find({
        where: {
          owner: {
            id: userId,
          },
        },
      });

      return events;
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
