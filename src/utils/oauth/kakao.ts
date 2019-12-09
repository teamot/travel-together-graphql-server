import * as request from 'request-promise';
import { RequestError } from 'request-promise/errors';
import { AuthenticationError, UserInputError } from 'apollo-server';

enum Uris {
  GET_ACCESS_TOKEN_INFO = 'https://kapi.kakao.com/v1/user/access_token_info',
  GET_USER = 'https://kapi.kakao.com/v2/user/me',
}

export enum UserProperties {
  PROPERTIES_NICKNAME = 'properties.nickname',
  PROPERTIES_PROFILE_IMAGE = 'properties.profile_image',
  PROPERTIES_THUMBNAIL_IMAGE = 'properties.thumbnail_image',
  KAKAO_ACCOUNT_PROFILE = 'kakao_account.profile',
  KAKAO_ACCOUNT_EMAIL = 'kakao_account.email',
  KAKAO_ACCOUNT_AGE_RANGE = 'kakao_account.age_range',
  KAKAO_ACCOUNT_BIRTHDAY = 'kakao_account.birthday',
  KAKAO_ACCOUNT_GENDER = 'kakao_account.gender',
}

interface TokenValidationResponse {
  id: number;
  expiresInMillis: number;
  appId: number;
}

interface GetUserBaseResponse {
  id: number;
  kakao_account: {
    profile: {
      nickname: string;
      profile_image_url?: string;
      thumbnail_image?: string;
    };
  };
}

export async function getAccessTokenInfo(accessToken: string): Promise<TokenValidationResponse | undefined> {
  try {
    const response = await request.get(Uris.GET_ACCESS_TOKEN_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    console.log(response);
    return JSON.parse(response);
  } catch (err) {
    handleError(err);
  }
}

export async function getUser(
  userId: string,
  accessToken: string,
  userProps: UserProperties[],
): Promise<GetUserBaseResponse> {
  const response = await request.post(Uris.GET_USER, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      target_id_type: 'user_id',
      target_id: userId,
      property_keys: userProps,
    }),
  });

  return JSON.parse(response);
}

function handleError(requestError: RequestError): never {
  console.log(requestError.error);
  const error = JSON.parse(requestError.error);
  switch (error.code) {
    case -401:
      throw new AuthenticationError('카카오 auth 서버에 존재하지 않는 accessToken.');
    case -2:
      throw new UserInputError('잘못된 형식의 토큰.');
    default:
      throw new UserInputError('로그인 실패');
  }
}
