import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { eventCategory } from './enums/eventCategory.enum';
import { Ticket } from 'src/tickets/ticket.entity';
import { eventPriceType } from './enums/eventPricetype.enum';
import { eventAttendanceMode } from './enums/attendanceMode.enum';
/**
 * event entity
 */
@Entity()
export class Event {
  /**
   * event id column
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * event id column
   */
  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
    unique: true,
  })
  name: string;

  /**
   * event category column
   */
  @Column({
    type: 'enum',
    enum: eventCategory,
    nullable: false,
  })
  category: eventCategory;

  /**
   * event price type
   */
  @Column({
    type: 'enum',
    enum: eventPriceType,
    nullable: false,
  })
  priceType: eventPriceType;

  /**
   * event attendance mode
   */
  @Column({
    type: 'enum',
    enum: eventAttendanceMode,
    nullable: false,
  })
  attendanceMode: eventAttendanceMode;

  /**
   * event description column
   */
  @Column({
    type: 'varchar',
    length: 2560,
    nullable: false,
  })
  description: string;

  /**
   * date event was created column
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * date event was updated column
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * event image column
   */
  @Column({ type: 'varchar', nullable: true, length: 1024 })
  image?: string;

  /**
   * event venue column
   */
  @Column({ type: 'varchar', nullable: true, length: 1024 })
  venue?: string;

  /**
   * event address column
   */
  @Column({ type: 'varchar', nullable: true, length: 1024 })
  address?: string;

  /**
   * event virtual link column
   */
  @Column({ type: 'varchar', nullable: true, length: 1024 })
  virtualLink?: string;

  /**
   * event start date column
   */
  @Column({ type: 'timestamp', nullable: false })
  eventStartDate: Date;

  /**
   * event start time column
   */
  @Column({ type: 'varchar', nullable: false, length: 5 })
  eventStartTime: string;

  /**
   * event end time column
   */
  @Column({ type: 'varchar', nullable: false, length: 5 })
  eventEndTime: string;

  /**
   * event end date column
   */
  @Column({ type: 'timestamp', nullable: true })
  eventEndDate?: Date;

  /**
   * event and owner relationship
   */
  @ManyToOne(() => User, (user) => user.events, { onDelete: 'CASCADE' })
  owner: User;

  /**
   * event and tickets relationship
   */
  @OneToMany(() => Ticket, (ticket) => ticket.event, { eager: true })
  tickets: Ticket[];

  // @OneToMany(() => Payment, (payment) => payment.event)
  // payments: Payment[];
}
