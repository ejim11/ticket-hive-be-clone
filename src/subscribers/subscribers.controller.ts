import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { SubscribersService } from './providers/subscribers.service';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { CreateSubscriberDto } from './dtos/create-subscriber.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * controller class for subscribers route
 */
@ApiTags('Subscribers')
@Controller('subscribers')
export class SubscribersController {
  /**
   * constructor
   * @param subscriberService
   */
  constructor(
    /**
     * injecting the subscriber service
     */
    private readonly subscriberService: SubscribersService,
  ) {}

  /**
   * function for creating a subscriber
   * @param createSubscriberDto
   * @returns subscriber
   */
  @ApiOperation({
    summary: 'It creates a subscriber and sends a mail',
  })
  // documentation for responses
  @ApiResponse({
    status: 201,
    description: 'Subscriber created successfully based on the query',
  })
  @ApiBody({
    description: 'Contains subscriber email ',
    required: true,
    type: CreateSubscriberDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          email: 'iloghaluagneskc@gmail.com',
        },
      },
      example2: {
        summary: 'Invalid request example (missing email)',
        value: {},
      },
    },
  })
  @Post()
  @Auth(AuthType.None)
  public createSubscriber(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberService.createSubscriber(createSubscriberDto);
  }

  /**
   * function for removing a subscriber from the subscription db
   * @param subscriberId
   * @returns message that shows the subscriber unsubscribed
   */
  @ApiOperation({
    summary: 'It deletes a subscriber based on their id',
  })
  @ApiResponse({
    status: 204,
    description: 'subscriber is deleted successfully based on user id',
  })
  @ApiParam({
    name: 'subscriberId',
    required: true,
    type: String,
    description: 'The unique identifier of the subscriber',
    example: '12345',
  })
  @Get('/:subscriberId')
  @Auth(AuthType.None)
  public deleteSubscriber(
    @Param('subscriberId', ParseIntPipe) subscriberId: number,
  ) {
    return this.subscriberService.unsubscribeEmail(subscriberId);
  }
}
