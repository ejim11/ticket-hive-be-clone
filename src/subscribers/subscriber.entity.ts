import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * subscriber entity for the table in the database
 */
@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;
}
