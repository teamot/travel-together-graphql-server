import { Resolver, Query, FieldResolver, Root } from 'type-graphql';
import { TravelRoom } from './type';
import { Country } from '../country/type';
import { TravelRoom as TravelRoomModel } from './models/travel-room';
import { Country as CountryModel } from '../country/models/country';
import { Account } from '../user/models/user';
import { User } from '../user/type';

@Resolver(type => TravelRoom)
export class TravelRoomResolver {
  @Query(returns => [TravelRoom])
  async travelRooms(): Promise<TravelRoom[]> {
    const travelRooms = await TravelRoomModel.find();
    return travelRooms;
  }

  @FieldResolver(type => [Country])
  async getCountries(@Root() travelRoom: TravelRoom): Promise<Country[]> {
    return await travelRoom.countries;
  }

  @FieldResolver(type => [User])
  async getMembers(@Root() travelRoom: TravelRoom): Promise<User[]> {
    return await travelRoom.members;
  }
}
