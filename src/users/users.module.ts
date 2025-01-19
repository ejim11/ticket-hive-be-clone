import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { CreateUsersProvider } from './providers/create-users.providers';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { StoreOtpAndExpireProvider } from './providers/store-otp-and-expire.provider';
import { FindUserByResetOtpAndExpiryTimeProvider } from './providers/find-user-by-reset-otp-and-expiry-time.provider';
import { ChangeUserPasswordProvider } from './providers/change-user-password.provider';
import { FindOneByIdProvider } from './providers/find-one-by-id.provider';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { EventsModule } from 'src/events/events.module';

@Module({
  providers: [
    UsersService,
    CreateUsersProvider,
    FindOneUserByEmailProvider,
    StoreOtpAndExpireProvider,
    FindUserByResetOtpAndExpiryTimeProvider,
    ChangeUserPasswordProvider,
    FindOneByIdProvider,
  ],
  controllers: [UsersController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    PaginationModule,
    forwardRef(() => EventsModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
