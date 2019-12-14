import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { MinLength, MaxLength, ArrayMaxSize } from 'class-validator';
import { Country, CountryCodes } from '../country/type';
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

@InputType()
export class CreateTravelRoomInput {
  @MinLength(2)
  @MaxLength(64)
  @Field({ description: '여행 이름' })
  name: string;

  @Field({ nullable: true, description: '여행이 시작되는 날' })
  startDate: Date;

  @Field({ nullable: true, description: '여행이 끝나는 날' })
  endDate: Date;

  @ArrayMaxSize(20)
  @Field(type => [CountryCodes], { description: '국가 코드 리스트' })
  countryCodes: CountryCodes[];
}
