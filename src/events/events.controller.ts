import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import {
  ApiBody,
  ApiConsumes,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EventsService } from './providers/events.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetEventsDto } from './dtos/get-events.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { Roles } from '@/auth/decorator/role.decorator';
import { Role } from '@/auth/enums/role-type.enum';

/**
 * controller for events route
 */
@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    /**
     * injecting the event service
     */
    private readonly eventsService: EventsService,
  ) {}

  /**
   * Function for creating events
   * @param createEventDto
   * @param user
   * @returns newly created event
   */
  @ApiOperation({
    summary: 'This api endpoint creates a new event',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your event is created successfully',
  })
  @ApiBody({
    description: 'Create a new event',
    required: true,
    type: CreateEventDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          name: 'Burna show',
          category: 'music',
          description: 'This is starboys show',
          venue: 'Eko Hotel',
          address: 'Lagos Island',
          image: 'https:aws-image.png',
          eventStartDateAndTime: 'Oct 14, 2024',
          tickets: [
            {
              type: 'general',
              price: 3000,
              summary: 'This is the general ticket',
            },
          ],
        },
      },
      example2: {
        summary: 'Invalid request example (missing name)',
        value: {
          category: 'music',
          description: 'This is starboys show',
          venue: 'Eko Hotel',
          address: 'Lagos Island',
          image: 'https:aws-image.png',
          eventStartDateAndTime: 'Oct 14, 2024',
          tickets: [
            {
              type: 'general',
              price: 3000,
              summary: 'This is the general ticket',
            },
          ],
        },
      },
    },
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'Bearer token for authorization',
    },
    {
      name: 'X-Custom-Header',
      required: false,
      description: 'A custom optional header',
    },
    {
      name: 'Content-Type',
      description: 'Must be multipart/form-data',
      example: 'multipart/form-data',
    },
  ])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.EVENTORGANISER)
  @Post('')
  public createEvent(
    @Body() createEventDto: CreateEventDto,
    @ActiveUser() user: ActiveUserData,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.eventsService.createEvent(createEventDto, user, file);
  }

  /**
   * route for deleting an event
   * @param id
   *
   */
  @ApiOperation({
    summary: 'It deletes an event',
  })
  @ApiResponse({
    status: 204,
    description: 'Event deleted successfully',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'The unique id of the event',
    example: 10,
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'Bearer token for authorization',
    },
    {
      name: 'X-Custom-Header',
      required: false,
      description: 'A custom optional header',
    },
  ])
  @Delete('/:id')
  public deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.eventsService.deleteEvent(id);
  }

  /**
   * route for getting all events
   * @param eventQuery
   * @returns all events
   */
  @ApiOperation({
    summary: 'It finds all events ',
  })
  @ApiResponse({
    status: 200,
    description: 'All events are fetched and paginated',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the api to return',
    example: 1,
  })
  @Auth(AuthType.None)
  @Get('')
  public findAllEvents(@Query() eventQuery: GetEventsDto) {
    return this.eventsService.findAll(eventQuery);
  }

  /**
   * route for getting an event by event id
   * @param eventId
   * @returns a particular event
   */
  @ApiOperation({
    summary: 'It finds a event based on its id',
  })
  @ApiResponse({
    status: 200,
    description: 'Event is fetched successfully based on its id',
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    type: String,
    description: 'The unique identifier of the event',
    example: '12345',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      required: true,
      description: 'Bearer token for authorization',
    },
    {
      name: 'X-Custom-Header',
      required: false,
      description: 'A custom optional header',
    },
  ])
  @Get('/:eventId')
  public findEventById(@Param('eventId') eventId: string) {
    return this.eventsService.findEventById(eventId);
  }
}
