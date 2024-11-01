import { Event } from 'src/events/event.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketStatus } from './enums/ticket-status.enum';

/**
 * ticket entity for ticket table
 */
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  type: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  price: number;

  @Column({
    type: 'varchar',
    length: '1024',
    nullable: false,
  })
  summary: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.UNSOLD,
    nullable: false,
  })
  ticketStatus: TicketStatus;

  @Column({ nullable: true })
  lockedAt?: Date;

  @ManyToOne(() => Event, (event) => event.tickets, { onDelete: 'CASCADE' })
  @JoinColumn()
  event: Event;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  owner?: User;
}
