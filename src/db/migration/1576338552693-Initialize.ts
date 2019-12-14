import { MigrationInterface, QueryRunner, getConnection } from 'typeorm';
import { Country } from '../../modules/country/models/country';

export class Initialize1576338552693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const countries: Country[] = [
      Country.create({
        code: 'KR',
        inKorean: '대한민국',
        inEnglish: 'Korea',
        emoji: ':)',
      }),
      Country.create({
        code: 'US',
        inKorean: '미국',
        inEnglish: 'America',
        emoji: ':O',
      }),
      Country.create({
        code: 'JP',
        inKorean: '일본',
        inEnglish: 'Japan',
        emoji: ':X',
      }),
      Country.create({
        code: 'CN',
        inKorean: '중국',
        inEnglish: 'China',
        emoji: ':P',
      }),
      Country.create({
        code: 'FR',
        inKorean: '프랑스',
        inEnglish: 'France',
        emoji: ':D',
      }),
    ];

    await getConnection().manager.save(countries);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    return queryRunner.query('delete from country');
  }
}
