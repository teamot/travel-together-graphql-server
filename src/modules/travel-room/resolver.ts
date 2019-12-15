import { Resolver, Query, FieldResolver, Root, Mutation, Arg, Authorized, Ctx, Args } from 'type-graphql';
import { getConnection } from 'typeorm';
import { TravelRoom, CreateTravelRoomInput } from './type';
import { Country } from '../country/type';
import { TravelRoom as TravelRoomModel } from './models/travel-room';
import { User } from '../user/type';
import { getSignedUrl, Targets } from '../../utils/aws/s3/signed-url-generator';
import { FileFormats } from '../../utils/aws/s3/object-key';
import { Context } from '../../context';
import { Account as AccountModel } from '../user/models/user';
import { Country as CountryModel } from '../country/models/country';

@Resolver(of => TravelRoom)
export class TravelRoomResolver {
  @Authorized()
  @Query(returns => [TravelRoom])
  async travelRooms(@Ctx() ctx: Context): Promise<TravelRoom[]> {
    const account = await AccountModel.findOne(ctx.userId, { relations: ['joinedTravelRooms'] });
    return account?.joinedTravelRooms || [];
  }

  @FieldResolver(type => [Country])
  async countries(@Root() travelRoom: TravelRoom, @Ctx() ctx: Context): Promise<Country[]> {
    return ctx.dataLoaders.countryByTravelRoomIdLoader.load(travelRoom.id);
  }

  @FieldResolver(type => [User])
  async members(@Root() travelRoom: TravelRoom, @Ctx() ctx: Context): Promise<User[]> {
    const members = await ctx.dataLoaders.userByTravelRoomIdLoader.load(travelRoom.id);
    return members;
  }

  @Authorized()
  @Query(returns => String, { nullable: true })
  async coverImageUploadUrl(
    @Arg('travelRoomId') travelRoomId: string,
    @Ctx() ctx: Context,
  ): Promise<string | undefined> {
    const travelRoom = await getConnection()
      .getRepository(TravelRoomModel)
      .createQueryBuilder('travelRoom')
      .where({ id: travelRoomId })
      .leftJoinAndSelect('travelRoom.members', 'members', 'members.id = :id', { id: ctx.userId })
      .getOne();

    if (!travelRoom || (await travelRoom.members).length < 1) {
      return undefined;
    }

    const { signedUrl, key } = await getSignedUrl(travelRoomId, Targets.TRAVEL_ROOM_COVER_ORIGIN, FileFormats.JPEG);
    travelRoom.coverImageUrl = key;
    await travelRoom.save();

    return signedUrl;
  }

  @Authorized()
  @Mutation(returns => TravelRoom)
  async createTravelRoom(
    @Arg('travelRoomInput') travelRoomInput: CreateTravelRoomInput,
    @Ctx('userId') userId: string,
  ): Promise<TravelRoom> {
    console.log('travelRoomInput:', travelRoomInput);
    const [countries, me] = await Promise.all([
      CountryModel.findByIds(travelRoomInput.countryCodes),
      AccountModel.findOne(userId),
    ]);

    const createdTravelRoom = await TravelRoomModel.create({
      name: travelRoomInput.name,
      startDate: travelRoomInput.startDate,
      endDate: travelRoomInput.endDate,
      countries,
      members: me ? [me] : [],
    }).save();

    return createdTravelRoom;
  }
}
