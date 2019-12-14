import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { InputType } from 'type-graphql';
import { TravelRoom } from '../../travel-room/models/travel-room';

@Entity('country')
export class Country extends BaseEntity {
  @PrimaryColumn({ length: 2 })
  code: string;

  @Column()
  inKorean: string;

  @Column()
  inEnglish: string;

  @Column({ length: 4 })
  emoji: string;

  @ManyToMany(
    type => TravelRoom,
    (travelRoom: TravelRoom) => travelRoom.countries,
  )
  @JoinTable({ name: 'travel-room_country' })
  travelRooms: TravelRoom[];
}
