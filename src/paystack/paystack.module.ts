import { Module } from '@nestjs/common';
import { PaystackController } from './paystack.controller';
import { PaystackService } from './providers/paystack.service';
import { ConfigModule } from '@nestjs/config';
import paystackConfig from './config/paystack.config';
import { TicketsModule } from 'src/tickets/tickets.module';
import { UploadsModule } from 'src/uploads/uploads.module';

@Module({
  controllers: [PaystackController],
  providers: [PaystackService],
  imports: [
    TicketsModule,
    UploadsModule,
    ConfigModule.forFeature(paystackConfig),
  ],
})
export class PaystackModule {}
