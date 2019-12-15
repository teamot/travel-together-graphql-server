import DataLoader from 'dataloader';
import { Account } from './models/user';
import { TravelRoom as TravelRoomModel } from '../travel-room/models/travel-room';

export function userByTravelRoomIdLoader() {
  return new DataLoader(
    async (travelRoomIds: readonly string[]): Promise<Account[][]> => {
      const travelRooms = await TravelRoomModel.findByIds([...travelRoomIds], {
        relations: ['members'],
      });

      return travelRooms.map(travelRoom => travelRoom.members);
    },
  );
}
