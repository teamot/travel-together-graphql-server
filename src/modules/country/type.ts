import { ObjectType, Field, ID, InputType } from 'type-graphql';
import { MaxLength, ArrayMaxSize } from 'class-validator';

@ObjectType()
export class Country {
  @Field({ description: '국가 고유 코드' })
  code: string;

  @Field({ description: '국가 이름(한국어)' })
  inKorean: string;

  @Field({ description: '국가 이름(영어)' })
  inEnglish: string;

  @Field({ description: '국가를 나타내는 이모지' })
  emoji: string;
}

@InputType({ description: '나라 목록 조회시 전달할 수 있는 파라미터(선택)' })
export class CountriesInput {
  @MaxLength(2, { each: true })
  @ArrayMaxSize(20)
  @Field(type => ID, {
    description: '조회하고자하는 국가의 코드를 배열 형태로 전달합니다. 최대 20개 까지 전달할 수 있습니다.',
  })
  countryCodes: string[];
}
