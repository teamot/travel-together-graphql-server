import { Resolver, Query, Arg } from 'type-graphql';
import { In } from 'typeorm';
import { Country as CountryModel } from './models/country';
import { Country, CountriesInput } from './type';

@Resolver()
export class CountryResolver {
  @Query(returns => [Country], { name: 'countries' })
  getCountries(@Arg('conditions', { nullable: true }) conditions?: CountriesInput): Promise<Country[]> {
    const countryCodes = conditions?.countryCodes;
    const condition = countryCodes && countryCodes.length > 0 ? { code: In(countryCodes) } : undefined;
    return CountryModel.find(condition);
  }
}
