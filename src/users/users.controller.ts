import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { GetUsersDto } from './dtos/get-user.dto';
import { GetUserEventsProvider } from 'src/events/providers/get-user-events.provider';
import { GetEventsDto } from 'src/events/dtos/get-events.dto';
import {
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * controller route for users
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    /**
     * injecting the  user service
     */
    private readonly usersService: UsersService,

    /**
     * injecting the get user events provider
     */
    private readonly getUserEventsProvider: GetUserEventsProvider,
  ) {}

  /**
   * route for creating a user
   * @param createUserDto
   * @returns the created user
   */
  @Post('/')
  @Auth(AuthType.None)
  @ApiOperation({
    summary: 'It creates a user ',
  })
  // documentation for responses
  @ApiResponse({
    status: 201,
    description: 'User created successfully based on the query',
  })
  @ApiBody({
    description: 'Contains user details',
    required: true,
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          firstName: 'Kelechi',
          lastName: 'Agnes',
          email: 'iloghaluagneskc@gmail.com',
          password: '@Password1',
          accountType: 'ticketPurchaser',
          role: 'ticketPurchaser',
        },
      },
      example2: {
        summary: 'Invalid request example (missing password)',
        value: {
          firstName: 'Kelechi',
          lastName: 'Agnes',
          email: 'iloghaluagneskc@gmail.com',
          accountType: 'ticketPurchaser',
          role: 'ticketPurchaser',
        },
      },
    },
  })
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * route for getting all users
   * @param usersQuery
   * @returns all users
   */
  @ApiOperation({
    summary: 'It finds all users ',
  })
  @ApiResponse({
    status: 200,
    description: 'All users are fetched and paginated',
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
  @Get()
  public findAllUsers(@Query() usersQuery: GetUsersDto) {
    return this.usersService.findAll(usersQuery);
  }

  /**
   * route for getting a user by user id
   * @param userId
   * @returns a user
   */
  @ApiOperation({
    summary: 'It finds a user based on their id',
  })
  @ApiResponse({
    status: 200,
    description: 'User is fetched successfully based on user id',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'The unique identifier of the user',
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
  @Get('/:userId')
  public findUser(@Param('userId') userId: string) {
    return this.usersService.findOneById(+userId);
  }

  /**
   * route for getting all events created by user
   * @param userId
   * @param eventsQuery
   * @returns all events from a user
   */
  @ApiOperation({
    summary: 'It finds all events a user has created based on their id',
  })
  @ApiResponse({
    status: 200,
    description: 'All events created by user are fetched',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'The unique identifier of the user',
    example: '12345',
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
  @Get('/:userId/events')
  public findUserEvents(
    @Param('userId') userId: string,
    @Query() eventsQuery: GetEventsDto,
  ) {
    return this.getUserEventsProvider.getUserEvents(userId, eventsQuery);
  }

  /**
   * route for deleting a user
   * @param userId
   * @returns a message indicating user was deleted
   */
  @ApiOperation({
    summary: 'It deletes a user based on their id',
  })
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    type: String,
    description: 'The unique identifier of the user',
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
  @Delete('/:userId')
  public deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.usersService.deleteUser(userId);
  }
}
