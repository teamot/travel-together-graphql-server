import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { OAuthLoginResponse, OAuthLoginInput } from './type';
import { getAccessTokenInfo, getUser, UserProperties } from '../../utils/oauth/kakao';
import { Account } from '../User/models/user';
import { generateAccessToken, generateRefreshToken } from '../../utils/token';
import { AuthenticationError } from 'apollo-server';

@Resolver()
export class OAuthResolver {
  @Query(returns => String)
  hello(): string {
    return 'world';
  }

  @Mutation(returns => OAuthLoginResponse)
  async oauthLogin(@Arg('oauthInfo') oauthInfo: OAuthLoginInput): Promise<OAuthLoginResponse> {
    const { oauthToken, oauthId, resourceServer } = oauthInfo;

    const accessTokenInfo = await getAccessTokenInfo(oauthToken);
    if (!accessTokenInfo) {
      throw new AuthenticationError('유효하지 않은 로그인 정보에요.');
    }

    const user = await getUser('' + accessTokenInfo.id, oauthToken, [
      UserProperties.PROPERTIES_NICKNAME,
      UserProperties.PROPERTIES_PROFILE_IMAGE,
    ]);

    const profile = user.kakao_account.profile;
    const account = new Account();
    account.name = profile.nickname;
    account.oauth = resourceServer;
    account.oauthId = oauthId;
    account.profileImageUrl = profile.profile_image_url;
    account.thumbnailImageUrl = profile.thumbnail_image;
    account.refreshToken = await generateRefreshToken(oauthInfo);

    const createdAccount = await account.save();

    const { token, payload } = await generateAccessToken(createdAccount.id);

    return { accessToken: token, exp: payload.exp, refreshToken: createdAccount.refreshToken };
  }
}
