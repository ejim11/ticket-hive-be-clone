import { PatchTicketDto } from '@/tickets/dtos/patch-ticket.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

/**
 * ticket type dto class
 */
class TicketTypeDto {
  /**
   * type of ticket
   */
  @ApiProperty({
    description: 'This is the quantity of tickets',
    example: 10,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  quantity: number;

  /**
   * type of ticket
   */
  @ApiProperty({
    description: 'patch ticket dto',
    example: 'general',
  })
  @IsNotEmpty()
  @Type(() => PatchTicketDto)
  ticket: PatchTicketDto;
}

/**
 * payment dto class
 */
export class PaymentDto {
  /**
   * event id
   */
  @ApiProperty({
    description: 'This is the id of the event',
    example: 34,
  })
  @IsInt()
  @IsNotEmpty()
  eventId: number;

  /**
   * type of ticket
   */
  @ApiProperty({
    description: 'This is the type of ticket',
    example: 'general',
  })
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketTypeDto)
  ticketTypes: TicketTypeDto[];
}
