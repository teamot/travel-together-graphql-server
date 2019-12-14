import { Resolver, Query, FieldResolver, Root, Mutation, Arg } from 'type-graphql';
import { getConnection } from 'typeorm';
import { TravelRoom, CreateTravelRoomInput } from './type';
import { Country } from '../country/type';
import { TravelRoom as TravelRoomModel } from './models/travel-room';
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

  @Mutation(returns => TravelRoom)
  async createTravelRoom(@Arg('travelRoom') travelRoom: CreateTravelRoomInput): Promise<TravelRoom> {
    const createdTravelRoom = await TravelRoomModel.create({
      name: travelRoom.name,
      startDate: travelRoom.startDate,
      endDate: travelRoom.endDate,
    }).save();

    await getConnection()
      .createQueryBuilder()
      .relation(TravelRoomModel, 'countries')
      .of({ id: createdTravelRoom.id })
      .add(travelRoom.countryCodes);

    return createdTravelRoom;
  }
}
