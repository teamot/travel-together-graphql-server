import { ObjectType, Field, ID } from 'type-graphql';
import { Country } from '../country/type';
import { User } from '../user/type';

@ObjectType()
export class TravelRoom {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  startDate: Date;

  @Field({ nullable: true })
  endDate: Date;

  @Field({ nullable: true })
  coverImageUrl: string;

  @Field(type => [Country])
  countries: Promise<Country[]>;

  @Field(type => [User])
  members: Promise<User[]>;

  @Field()
  createdDate: Date;
}
