import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event.entity';
import { EventsService } from './providers/events.service';
import { CreateEventProvider } from './providers/create-event.provider';
import { EventsController } from './events.controller';
import { UsersModule } from 'src/users/users.module';
import { UploadsModule } from 'src/uploads/uploads.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { GetUserEventsProvider } from './providers/get-user-events.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    forwardRef(() => UsersModule),
    UploadsModule,
    PaginationModule,
  ],
  providers: [EventsService, CreateEventProvider, GetUserEventsProvider],
  controllers: [EventsController],
  exports: [GetUserEventsProvider, EventsService],
})
export class EventsModule {}
