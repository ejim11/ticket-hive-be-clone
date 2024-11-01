import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTicketDto } from './create-tickets.dto';
import { IsInt, IsNotEmpty } from 'class-validator';

/**
 * dto class for patch ticket
 */
export class PatchTicketDto extends PartialType(CreateTicketDto) {
  /**
   * ticket id
   */
  @ApiProperty({
    description: 'The ID of the ticket that is bought',
    example: 77,
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
