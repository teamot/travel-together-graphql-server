import { userByTravelRoomIdLoader } from '../modules/user/loader';
import { countryByTravelRoomIdLoader } from '../modules/country/loader';

// type DataLoaderGenerator<K, V, C = K> = () => DataLoader<K, V, C>;
// interface DataLoaderGenerators {
//   [key: string]: DataLoaderGenerator<any, , any>;
// }

export interface DataLoaders {
  userByTravelRoomIdLoader: ReturnType<typeof userByTravelRoomIdLoader>;
  countryByTravelRoomIdLoader: ReturnType<typeof countryByTravelRoomIdLoader>;
}

export function newDataLoaders(): DataLoaders {
  return {
    userByTravelRoomIdLoader: userByTravelRoomIdLoader(),
    countryByTravelRoomIdLoader: countryByTravelRoomIdLoader(),
  };
}
