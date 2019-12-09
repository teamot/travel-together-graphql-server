import { ObjectType, Field, ID, registerEnumType, InputType } from 'type-graphql';

export enum OAuthServers {
  KAKAO = 'kakao',
}

registerEnumType(OAuthServers, {
  name: 'OAuthServers',
  description: 'OAuth를 제공하는 리소스 서버의 종류입니다. "kakao"를 전달하면 됩니다.',
});

@InputType()
export class OAuthLoginInput {
  @Field(type => ID)
  oauthId: string;

  @Field()
  oauthToken: string;

  @Field(type => OAuthServers)
  resourceServer: OAuthServers;
}

@ObjectType()
export class OAuthLoginResponse {
  @Field()
  accessToken: string;

  @Field()
  exp: number;

  @Field()
  refreshToken: string;
}
