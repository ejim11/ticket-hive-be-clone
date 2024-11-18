import { Controller, Get, Req } from '@nestjs/common';
import { TicketsService } from './providers/tickets.service';

import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import {
  ApiHeaders,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

/**
 * controller class for the ticket route
 */
@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  /**
   * constructor
   * @param ticketsService
   */
  constructor(
    /**
     * injecting the tickets service
     */
    private readonly ticketsService: TicketsService,
  ) {}

  @ApiOperation({
    summary: 'It finds all tickets made by a user ',
  })
  @ApiResponse({
    status: 200,
    description: 'All tickets made by a user are fetched and paginated',
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
  @Get('get-creator-tickets')
  @Roles(Role.EVENTORGANISER)
  public getTicketsFromOwner(@Req() req: any) {
    return this.ticketsService.getOwnerTickets(req.user.sub);
  }
}
