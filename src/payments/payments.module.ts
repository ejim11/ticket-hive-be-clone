import { Module } from '@nestjs/common';
import { PaymentsService } from './providers/payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentsService],
})
export class PaymentsModule {}
