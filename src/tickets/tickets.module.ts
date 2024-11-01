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

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UsersModule, EventsModule],
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
