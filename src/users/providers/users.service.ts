import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreaterUsersProviders } from './creater-users.providers';
import { CreateUserDto } from '../dtos/create-user.dto';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { StoreOtpAndExpireProvider } from './store-otp-and-expire.provider';
import { User } from '../user.entity';
import { FindUserByResetOtpAndExpiryTimeProvider } from './find-user-by-reset-otp-and-expiry-time.provider';
import { ChangeUserPasswordProvider } from './change-user-password.provider';
import { FindOneByIdProvider } from './find-one-by-id.provider';
import { GetUsersDto } from '../dtos/get-user.dto';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * service provider for the user module
 * injectable
 */
@Injectable()
export class UsersService {
  /**
   * constructor
   * @param createUserProvider
   * @param findOneUserByEmailProvider
   * @param storeOtpAndExpiresProvider
   * @param findUserByResetOtpAndExpiresProvider
   * @param changeUserPasswordProvider
   * @param findOneByIdProvider
   * @param paginationprovider
   * @param usersRepository
   */
  constructor(
    /**
     * injecting the create user provider
     */
    private readonly createUserProvider: CreaterUsersProviders,

    /**
     * Injecting the findOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    /**
     * injecting the store otp and expires provider
     */
    private readonly storeOtpAndExpiresProvider: StoreOtpAndExpireProvider,

    /**
     * injecting the find user by reset otp and expires provider
     */
    private readonly findUserByResetOtpAndExpiresProvider: FindUserByResetOtpAndExpiryTimeProvider,

    /**
     * injecting the change user password provider
     */
    private readonly changeUserPasswordProvider: ChangeUserPasswordProvider,

    /**
     * injecting the find one by id provider
     */
    private readonly findOneByIdProvider: FindOneByIdProvider,

    /**
     * injecting the pagination provider
     */
    private readonly paginationprovider: PaginationProvider,

    /**
     * injecting the user repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * function for creating a new user
   * @param createUserDto
   * @returns the create user
   */
  public async create(createUserDto: CreateUserDto) {
    return await this.createUserProvider.createUser(createUserDto);
  }

  /**
   * function for getting the user based on the email
   * @param email
   * @returns a user based on the email
   */
  public async findOneByEmail(email: string) {
    return this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  /**
   * function for storing the reset token and expiry date of the token
   * @param user
   * @param token
   * @returns a user with stored reset token and expiry date
   */
  public async storeTokenOtpAndOtpExpire(user: User, token: string) {
    return await this.storeOtpAndExpiresProvider.storeOtpAndExpire(user, token);
  }

  /**
   * function for getting the user based on the stored reset token and expiry date
   * @param otp
   * @returns the user based on the stored reset token and expiry date
   */
  public async findUserByResetOtpAndExpiryTime(otp: string) {
    return await this.findUserByResetOtpAndExpiresProvider.findUserByResetOtpAndExpiryTime(
      otp,
    );
  }

  /**
   * function for changing user password
   * @param user
   * @param newPassword
   * @returns the user with changed password
   */
  public async changeUserPassword(user: User, newPassword: string) {
    return await this.changeUserPasswordProvider.changeUserPassword(
      user,
      newPassword,
    );
  }

  /**
   * function for getting the user based on id
   * @param id
   * @returns user based on the user id
   */
  public async findOneById(id: number) {
    return await this.findOneByIdProvider.findById(id);
  }

  /**
   * function for getting all users
   * @param userQuery
   * @returns all users
   */
  public async findAll(userQuery: GetUsersDto): Promise<Paginated<User>> {
    try {
      const user = this.paginationprovider.paginationQuery(
        {
          limit: userQuery.limit,
          page: userQuery.page,
        },
        this.usersRepository,
        {
          relations: null,
        },
      );

      return user;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  /**
   * a function for deleting a user
   * @param userId
   * @returns a message on successful deletion
   */
  public async deleteUser(userId: number) {
    try {
      await this.usersRepository.delete(userId);
      return {
        message: `User ${userId}, was successfully deleted`,
      };
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
