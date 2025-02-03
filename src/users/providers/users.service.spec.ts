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

  // Assuming you have a User interface like this
  interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: Role;
    accountType: accountType;
    events: any[];
    // ... other properties
  }

  // Mock the provider
  const mockUser: User = {
    id: 123,
    email: 'test@example.com',
    firstName: 'Ejim',
    lastName: 'Favour',
    password: 'jndomnfondo',
    role: Role.EVENTPURCHASER,
    accountType: accountType.TICKETPURCHASER,
    events: [{ name: 'Biology' }],

    // ... other required properties
  };

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

    const mockFindOneUserByEmailProvider: Partial<FindOneUserByEmailProvider> =
      {
        findOneByEmail: (email: string) => Promise.resolve(mockUser),
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
        {
          provide: FindOneUserByEmailProvider,
          useValue: mockFindOneUserByEmailProvider,
        },
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
      expect(service.createUser).toBeDefined();
    });

    it('should call createUser on CreateUserProvider ', async () => {
      const user = await service.createUser({
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

  describe('findUserByEmail', () => {
    it('should be defined', () => {
      expect(service.findOneByEmail).toBeDefined();
    });

    it('should find a user by email', async () => {
      const user = await service.findOneByEmail('test@example.com');

      expect(user.firstName).toEqual(mockUser.firstName);
    });
  });
});
