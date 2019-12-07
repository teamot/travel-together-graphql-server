import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('travel-room')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('date', { nullable: true })
  startDate: Date;

  @Column('date', { nullable: true })
  endDate: Date;
}
