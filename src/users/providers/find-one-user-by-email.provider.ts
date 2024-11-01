import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * provider for finding user based on email
 */
@Injectable()
export class FindOneUserByEmailProvider {
  /**
   * constructor
   * @param usersRepository
   */
  constructor(
    /**
     * Injecting usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * function for finding user based on email
   * @param email
   * @returns user
   */
  public async findOneByEmail(email: string) {
    let user: User | undefined = undefined;

    try {
      user = await this.usersRepository.findOne({
        where: { email: email },
        select: [
          'id',
          'password',
          'email',
          'role',
          'accountType',
          'firstName',
          'lastName',
        ],
      });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch the user',
      });
    }

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    return user;
  }
}
