import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { eventCategory } from '../enums/eventCategory.enum';
import { Ticket } from 'src/tickets/ticket.entity';
import { Type } from 'class-transformer';
import { CreateTicketDto } from 'src/tickets/dtos/create-tickets.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { eventPriceType } from '../enums/eventPricetype.enum';
import { eventAttendanceMode } from '../enums/attendanceMode.enum';

/**
 * dto for creating events
 */
export class CreateEventDto {
  /**
   * name of event
   */
  @ApiProperty({
    description: 'This is the name of the event',
    example: 'Star boys show',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * category of event
   */
  @ApiProperty({
    enum: eventCategory,
    description: 'This is the category of the event',
    example: 'Music',
  })
  @IsEnum(eventCategory)
  @IsNotEmpty()
  category: eventCategory;

  /**
   * category of event
   */
  @ApiProperty({
    enum: eventPriceType,
    description: 'This is the event price type.',
    example: 'free',
  })
  @IsEnum(eventPriceType)
  @IsNotEmpty()
  priceType: eventPriceType;

  /**
   * event attendance mode
   */
  @ApiProperty({
    enum: eventAttendanceMode,
    description: 'This is the event attendance mode',
    example: 'ongoing',
  })
  @IsEnum(eventAttendanceMode)
  @IsNotEmpty()
  attendanceMode: eventAttendanceMode;

  /**
   * description of event
   */
  @ApiProperty({
    description: 'This is the description of the event',
    example: 'Be the free person in star boys show',
  })
  @IsString()
  @MaxLength(2560)
  description: string;

  /**
   * image of event
   */
  @ApiProperty({
    description: 'This is the image of the event',
    example: 'https://aws-image.png',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  image: string;

  /**
   * venue of event
   */
  @ApiPropertyOptional({
    description: 'This is the venue of the event',
    example: 'Eko Hotels',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  venue?: string;

  /**
   * address of event
   */
  @ApiPropertyOptional({
    description: 'This is the address of the event',
    example: 'Lagos Island, Nigeria',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  address?: string;

  /**
   * virtual link of event
   */
  @ApiPropertyOptional({
    description: 'This is the virtual link of the event',
    example: 'https://www.starboy.com',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  virtualLink?: string;

  /**
   * start date of event
   */
  @ApiProperty({
    description: 'This is the start date of the event',
    example: '16th April, 2024',
  })
  @IsDate()
  @IsNotEmpty()
  eventStartDate: Date;

  /**
   * end date of event
   */
  @ApiPropertyOptional({
    description: 'This is the end date of the event',
    example: '24th April, 2024',
  })
  @IsOptional()
  @IsDate()
  eventEndDate?: Date;

  /**
   * start time of event
   */
  @ApiProperty({
    description: 'This is the start time of the event',
    example: '08:00',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  eventStartTime: string;

  /**
   * end time of event
   */
  @ApiProperty({
    description: 'This is the end time of the event',
    example: '13:00',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  eventEndTime: string;

  /**
   * event tickets
   */
  @ApiProperty({
    description: 'These are the tickets of the event',
    example: {
      type: 'general',
      price: 3000,
      summary: 'This is the general ticket',
    },
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTicketDto)
  tickets: Ticket[];
}
