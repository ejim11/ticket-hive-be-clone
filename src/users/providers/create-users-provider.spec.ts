import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsersProvider } from './create-users.providers';
import { MailService } from '../../mail/providers/mail.service';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';

// type MockRepository<T=any> =

describe('CreateUserProvider', () => {
  let provider: CreateUsersProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUsersProvider,
        { provide: MailService, useValue: {} },
        { provide: HashingProvider, useValue: {} },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
      ],
    }).compile();

    provider = module.get<CreateUsersProvider>(CreateUsersProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
