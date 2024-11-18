import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * base dto fot events
 */
class GetEventsBaseDto {
  /**
   * start date
   */
  @IsDate()
  @IsOptional()
  startDate?: Date;

  /**
   * end date
   */
  @IsDate()
  @IsOptional()
  endDate?: Date;

  /**
   * event name
   */
  @IsString()
  @IsOptional()
  name?: string;

  /**
   * event category
   */
  @IsString()
  @IsOptional()
  category?: string;

  /**
   * event category
   */
  @IsString()
  @IsOptional()
  date?: string;

  /**
   * event price type
   */
  @IsString()
  @IsOptional()
  price?: string;

  /**
   * event attendance mode
   */
  @IsString()
  @IsOptional()
  attendance?: string;

  /**
   * owner id
   */
  @IsInt()
  @IsOptional()
  owner?: number;
}

/**
 * dto for get events
 */
export class GetEventsDto extends IntersectionType(
  GetEventsBaseDto,
  PaginationQueryDto,
) {}
