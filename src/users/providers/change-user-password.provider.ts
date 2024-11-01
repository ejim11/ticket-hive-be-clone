import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * provider class for the change user password
 */
@Injectable()
export class ChangeUserPasswordProvider {
  /**
   * constructor
   * @param usersRepository
   */
  constructor(
    /**
     * injecting the users repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * fuunction for changing the user password
   * @param user
   * @param newPassword
   * @returns user
   */
  public async changeUserPassword(user: User, newPassword: string) {
    const newUserObj = {
      ...user,
      password: newPassword,
      resetOtp: null,
      resetOtpExpire: null,
    };

    try {
      return await this.usersRepository.save(newUserObj);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
