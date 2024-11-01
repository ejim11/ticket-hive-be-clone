import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateTicketDto } from './create-tickets.dto';

/**
 * dto class for create many tickets
 */
export class CreateManyTicketsDto {
  /**
   * tickets list
   */
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      // the type of entity we expect for each of the items
      type: 'User',
    },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  //   this tells the type of values we are expecting in each nested obj
  @Type(() => CreateTicketDto)
  tickets: CreateTicketDto[];
}
