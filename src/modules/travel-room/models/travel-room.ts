import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  BaseEntity,
  getConnection,
} from 'typeorm';
import { Country } from '../../country/models/country';
import { Account } from '../../user/models/user';

@Entity('travel-room')
export class TravelRoom extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 64 })
  name: string;

  @Column('date', { nullable: true })
  startDate: Date;

  @Column('date', { nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  coverImageUrl: string;

  @ManyToMany(
    type => Country,
    (country: Country) => country.travelRooms,
  )
  @JoinTable({ name: 'travel-room_country' })
  countries: Country[];

  @ManyToMany(
    type => Account,
    (account: Account) => account.joinedTravelRooms,
  )
  @JoinTable({ name: 'travel-room_account' })
  members: Account[];

  @CreateDateColumn()
  createdDate: Date;

  async getCountries(): Promise<Country[]> {
    const travelRoom = await TravelRoom.findOne(this.id, { relations: ['countries'] });
    travelRoom?.countries;
    return [];
  }
}
