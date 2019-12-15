import DataLoader from 'dataloader';
import { Country as CountryModel } from './models/country';
import { TravelRoom as TravelRoomModel } from '../travel-room/models/travel-room';

export function countryByTravelRoomIdLoader() {
  return new DataLoader(
    async (travelRoomIds: readonly string[]): Promise<CountryModel[][]> => {
      const travelRooms = await TravelRoomModel.findByIds([...travelRoomIds], { relations: ['countries'] });
      const result = travelRooms.map(travelRoom => travelRoom.countries);
      return result;
    },
  );
}
