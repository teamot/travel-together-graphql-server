import * as request from 'request-promise';
import { RequestError } from 'request-promise/errors';
import { AuthenticationError, UserInputError } from 'apollo-server';

enum Uris {
  GET_ACCESS_TOKEN_INFO = 'https://kapi.kakao.com/v1/user/access_token_info',
}

export async function getAccessTokenInfo(accessToken: string) {
  try {
    return await request.get(Uris.GET_ACCESS_TOKEN_INFO, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
  } catch (err) {
    handleError(err);
  }
}

function handleError(requestError: RequestError): never {
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
