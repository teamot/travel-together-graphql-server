import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { OAuthLoginResponse, OAuthLoginInput } from './type';
import { getAccessTokenInfo, getUser, UserProperties } from '../../utils/oauth/kakao';
import { Account } from '../user/models/user';
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
    let account = await Account.findOne({ where: { oauthId } });
    if (!account) {
      const newAccount = new Account();
      newAccount.name = profile.nickname;
      newAccount.oauth = resourceServer;
      newAccount.oauthId = oauthId;
      newAccount.profileImageUrl = profile.profile_image_url;
      newAccount.thumbnailImageUrl = profile.thumbnail_image;
      newAccount.refreshToken = await generateRefreshToken(oauthInfo);
      account = await newAccount.save();
    }

    const { token, payload } = await generateAccessToken(account.id);

    return { accessToken: token, exp: payload.exp, refreshToken: account.refreshToken };
  }
}
