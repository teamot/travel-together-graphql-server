import { Resolver, Query, FieldResolver, Root, Mutation, Arg } from 'type-graphql';
import { getConnection } from 'typeorm';
import { TravelRoom, CreateTravelRoomInput } from './type';
import { Country } from '../country/type';
import { TravelRoom as TravelRoomModel } from './models/travel-room';
import { User } from '../user/type';
import { getSignedUrl, Targets } from '../../utils/aws/s3/signed-url-generator';

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

  @Query(returns => String)
  async coverImageUploadUrl(@Arg('travelRoomId') travelRoomId: string): Promise<string> {
    return getSignedUrl(travelRoomId, Targets.TRAVEL_ROOM_COVER_ORIGIN);
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
