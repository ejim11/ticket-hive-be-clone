import { IsOptional, IsString } from 'class-validator';

export class GetTicketDto {
  /**
   * month
   */
  @IsString()
  @IsOptional()
  month?: string;
}
