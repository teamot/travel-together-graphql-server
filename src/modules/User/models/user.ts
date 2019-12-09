import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity } from 'typeorm';
import { OAuthServers } from '../../oauth/type';

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

  @CreateDateColumn()
  createdDate: Date;
}
