import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { accountType } from '../enums/account-type.enum';
import { Role } from 'src/auth/enums/role-type.enum';
import { ApiProperty } from '@nestjs/swagger';

/**
 * dto class for creating user dto
 */
export class CreateUserDto {
  /**
   * user firstname
   */
  @ApiProperty({
    description: 'This is the first name of the user',
    example: 'Favour',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  /**
   * user lastname
   */
  @ApiProperty({
    description: 'This is the last name of the user',
    example: 'Ejim',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(96)
  lastName: string;

  /**
   * user email address
   */
  @ApiProperty({
    description: 'This is the email of the user',
    example: 'Favour@gmail.com',
  })
  @IsEmail()
  @MaxLength(96)
  @IsNotEmpty()
  email: string;

  /**
   * user password
   */
  @ApiProperty({
    description: 'This is the password of the user',
    example: '@Favour233',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, {
    message:
      'Minimum eight characters, atleast one letter, number and special character',
  })
  password: string;

  /**
   * user account type
   */
  @ApiProperty({
    description: 'This is the account type of the user',
    example: 'TicketPurchaser',
  })
  @IsEnum(accountType)
  @IsOptional()
  accountType?: accountType;

  /**
   * user role
   */
  @ApiProperty({
    description: 'This is the role of the user',
    example: 'Admin',
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
