import { Body, Controller, Patch, Post } from '@nestjs/common';
import { TicketsService } from './providers/tickets.service';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/enums/role-type.enum';
import { PatchTicketDto } from './dtos/patch-ticket.dto';
import {
  ApiBody,
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
}
