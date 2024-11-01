import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';

/**
 * provider class for storing otp and expiry date
 */
@Injectable()
export class StoreOtpAndExpireProvider {
  /**
   * constructor
   * @param usersRepository
   */
  constructor(
    /**
     * Injecting the users repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * function for storing otp and expiry date
   * @param user
   * @param otp
   * @returns user
   */
  public async storeOtpAndExpire(user: User, otp: string) {
    const resetExpires = new Date(Date.now() + 10 * 60 * 1000);
    const newUserObj = { ...user, resetOtp: otp, resetOtpExpire: resetExpires };
    try {
      return await this.usersRepository.save(newUserObj);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
