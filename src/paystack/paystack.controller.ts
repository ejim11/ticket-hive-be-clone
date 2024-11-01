import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { PaystackService } from './providers/paystack.service';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import {
  ApiBody,
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaymentDto } from './dtos/payment.dto';

/**
 * paystack controller route
 */
@ApiTags('Paystack')
@Controller('paystack')
export class PaystackController {
  constructor(
    /**
     * injecting the paystack service
     */
    private readonly paystackService: PaystackService,
  ) {}

  /**
   * function for generating link to paystack service
   * @param paymentDto
   * @param user
   * @returns link to paystack service
   */
  @ApiOperation({
    summary: 'Initializes payment for ticket',
  })
  // documentation for responses
  @ApiResponse({
    status: 200,
    description: 'User buys ticket successfully',
  })
  @ApiBody({
    description: 'Contains id for event and the ticket type',
    required: true,
    type: PaymentDto,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          eventId: 43,
          ticketType: 'general',
        },
      },
      example2: {
        summary: 'Invalid request example (missing event id)',
        value: {
          ticketType: 'general',
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
  ])
  @Post('/initialize-payment')
  @Roles(Role.EVENTPURCHASER)
  public payForTicket(
    @Body() paymentDto: PaymentDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.paystackService.initializePayment(paymentDto, user);
  }

  // Callback route to handle Paystack's webhook/callback
  /**
   * Webhook route to handle Paystack's webhook
   * @param body
   * @param signature
   * @param req
   * @returns modified ticket
   */
  @ApiOperation({
    summary: 'Wehook called when user pays for the ticket successfully',
  })
  // documentation for responses
  @ApiResponse({
    status: 200,
    description: 'User buys ticket successfully',
  })
  @ApiBody({
    description: 'Contains id for ticket',
    required: true,
    examples: {
      example1: {
        summary: 'Valid request example',
        value: {
          reference: 'ibewfib9',
          event: { status: 'success' },
        },
      },
      example2: {
        summary: 'Invalid request example (missing event id)',
        value: {
          ticketType: 'general',
        },
      },
    },
  })
  @Post('/webhook')
  @Auth(AuthType.None)
  @HttpCode(HttpStatus.OK)
  async handlePaymentWebhook(
    @Body() body: any,
    @Headers('x-paystack-signature') signature: string,
    @Req() req: any,
  ) {
    return this.paystackService.paymentWebhook(body, signature, req);
  }
}
