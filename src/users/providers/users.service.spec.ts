import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PaginationProvider } from '../../common/pagination/providers/pagination.provider';
import { FindOneByIdProvider } from './find-one-by-id.provider';
import { ChangeUserPasswordProvider } from './change-user-password.provider';
import { FindUserByResetOtpAndExpiryTimeProvider } from './find-user-by-reset-otp-and-expiry-time.provider';
import { StoreOtpAndExpireProvider } from './store-otp-and-expire.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUsersProvider } from './create-users.providers';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Role } from '../../auth/enums/role-type.enum';
import { accountType } from '../enums/account-type.enum';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUsersProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 13,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
          role: createUserDto.role,
          accountType: createUserDto.accountType,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: CreateUsersProvider, useValue: mockCreateUserProvider },
        { provide: PaginationProvider, useValue: {} },
        { provide: FindOneByIdProvider, useValue: {} },
        { provide: ChangeUserPasswordProvider, useValue: {} },
        { provide: FindUserByResetOtpAndExpiryTimeProvider, useValue: {} },
        { provide: StoreOtpAndExpireProvider, useValue: {} },
        { provide: FindOneUserByEmailProvider, useValue: {} },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call createUser on CreateUserProvider ', async () => {
      let user = await service.create({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        password: 'password',
        role: Role.EVENTORGANISER,
        accountType: accountType.EVENTORGANISER,
      });

      expect(user.firstName).toEqual('John');
    });
  });
});
