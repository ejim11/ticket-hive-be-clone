import { IsInt, IsNotEmpty, IsString } from 'class-validator';

/**
 * dto class for creating a ticket
 */
export class CreateTicketDto {
  /**
   * ticket type
   */
  @IsString()
  @IsNotEmpty()
  type: string;

  /**
   * ticket price
   */
  @IsInt()
  @IsNotEmpty()
  price: number;

  /**
   * ticket summary
   */
  @IsString()
  @IsNotEmpty()
  summary: string;
}
