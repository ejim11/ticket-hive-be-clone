import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { paymentStatus } from './enums/paymentStatus.enum';
import { Ticket } from '@/tickets/ticket.entity';

/**
 * payment entity
 */
@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: paymentStatus,
    default: paymentStatus.PENDING,
  })
  status: paymentStatus;

  @Column()
  provider: string;

  @Column({ unique: true })
  providerReference: string;

  @Column({ nullable: true })
  authorizationUrl?: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: false })
  eventId: number;

  @Column({ nullable: false })
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Ticket)
  @JoinTable({
    name: 'payment_tickets',
    joinColumn: { name: 'paymentId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'ticketId', referencedColumnName: 'id' },
  })
  tickets: Ticket[];
}
