import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { MoreThan, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * provider class for finding user based on stored reset token and expiry time
 */
@Injectable()
export class FindUserByResetOtpAndExpiryTimeProvider {
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
   * function for finding a user based on the stored reset token and expiry time
   * @param otp
   * @returns user
   */
  public async findUserByResetOtpAndExpiryTime(otp: string) {
    let user;

    try {
      user = await this.usersRepository.find({
        where: {
          resetOtp: otp,
          resetOtpExpire: MoreThan(new Date()),
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch the user',
      });
    }

    if (!user[0]) {
      throw new UnauthorizedException('Otp is no longer valid');
    }

    return user[0];
  }
}
