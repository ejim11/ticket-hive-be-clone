import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

/**
 * provider class for creating user
 */
@Injectable()
export class CreateUsersProvider {
  /**
   * constructor
   * @param usersRepository
   * @param hashingProvider
   * @param mailService
   */
  constructor(
    /**
     * inhjecting the user repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * injecting the hashing provider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    /**
     * injecting the mail service
     */
    private readonly mailService: MailService,
  ) {}

  /**
   * function for creating user
   * @param createUserDto
   * @returns created user
   */
  public async createUser(createUserDto: CreateUserDto) {
    let existingUser;

    try {
      // check if user already exists with same email
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    // handle exception
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email',
        {},
      );
    }

    // create a new user
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    // save the user to the db
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(error);
    }

    return {
      id: newUser.id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role,
      accountType: newUser.accountType,
    };
  }
}
