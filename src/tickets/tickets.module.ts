import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { TicketsService } from './providers/tickets.service';
import { TicketsController } from './tickets.controller';
import { BuyTicketProvider } from './providers/buy-ticket.provider';
import { UsersModule } from 'src/users/users.module';
import { EventsModule } from 'src/events/events.module';
import { UpdateBoughtTicketProvider } from './providers/update-bought-ticket.provider';
import { GenerateTicketPdfProvider } from './providers/generate-ticket-pdf.provider';
import { PaginationModule } from '@/common/pagination/pagination.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    UsersModule,
    EventsModule,
    PaginationModule,
  ],
  providers: [
    BuyTicketProvider,
    TicketsService,
    UpdateBoughtTicketProvider,
    GenerateTicketPdfProvider,
  ],
  controllers: [TicketsController],
  exports: [TicketsService],
})
export class TicketsModule {}
