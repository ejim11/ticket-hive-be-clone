import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * provider class for finding one user by id
 */
@Injectable()
export class FindOneByIdProvider {
  /**
   * constructor
   * @param usersRepository
   */
  constructor(
    /**
     * injecting user repository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * function for finding user based on id
   * @param id
   * @returns user
   */
  public async findById(id: number) {
    let user;
    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (err: any) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    /**
     * Handle the user does not exist
     */
    if (!user) {
      throw new BadRequestException('The user does not exist');
    }
    return user;
  }
}
