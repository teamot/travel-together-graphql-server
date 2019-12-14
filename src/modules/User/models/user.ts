import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { OAuthServers } from '../../oauth/type';
import { TravelRoom } from '../../travel-room/models/travel-room';

@Entity('account')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  oauthId: string;

  @Column('enum', { enum: OAuthServers })
  oauth: OAuthServers;

  @Column()
  name: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column({ nullable: true })
  thumbnailImageUrl?: string;

  @Column()
  refreshToken: string;

  @ManyToMany(
    type => TravelRoom,
    (travelRoom: TravelRoom) => travelRoom.members,
  )
  @JoinTable({ name: 'travel-room_account' })
  joinedTravelRooms: Promise<TravelRoom[]>;

  @CreateDateColumn()
  createdDate: Date;
}
