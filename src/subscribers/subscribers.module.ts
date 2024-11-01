import { Module } from '@nestjs/common';
import { SubscribersController } from './subscribers.controller';
import { SubscribersService } from './providers/subscribers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './subscriber.entity';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [SubscribersController],
  providers: [SubscribersService],
  imports: [TypeOrmModule.forFeature([Subscriber]), MailModule],
})
export class SubscribersModule {}
