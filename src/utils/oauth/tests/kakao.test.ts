import { getAccessTokenInfo } from '../kakao';
import { AuthenticationError } from 'apollo-server';

describe('카카오로 로그인', () => {
  describe('accessToken으로 유저 정보 조회', () => {
    test('토큰이 올바르지 않은 경우 throw AuthenticationError.', async () => {
      expect(getAccessTokenInfo('wrong-accessToken')).rejects.toBeInstanceOf(AuthenticationError);
    });
  });
});
