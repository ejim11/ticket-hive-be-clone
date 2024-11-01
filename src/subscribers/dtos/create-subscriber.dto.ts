import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

/**
 * dto for creating a subscriber
 */
export class CreateSubscriberDto {
  /**
   * email address
   */
  @ApiProperty({
    description: 'This is the email of the subscriber',
    example: 'Favour@gmail.com',
  })
  @IsEmail()
  @MaxLength(96)
  @IsNotEmpty()
  email: string;
}
