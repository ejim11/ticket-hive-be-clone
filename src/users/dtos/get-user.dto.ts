import { IntersectionType } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

/**
 * dto class for get user base
 */
export class GetUsersBaseDto {
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
}

/**
 * dto class for get user
 */
export class GetUsersDto extends IntersectionType(
  GetUsersBaseDto,
  PaginationQueryDto,
) {}
