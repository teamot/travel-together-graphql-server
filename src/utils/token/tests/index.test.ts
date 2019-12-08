import uuid4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import { extractPayload, generateAccessToken, generateRefreshToken } from '..';

describe('JWT 모듈', () => {
  describe('액세스 토큰 생성', () => {
    test('생성된 토큰과 페이로드를 반환한다. 만료 기한은 디폴트로 15분이다', async () => {
      const userId = uuid4();
      const after15Min = Math.floor(+new Date() / 1000) + 15 * 60;
      const tokenInfo = await generateAccessToken(userId);

      expect(tokenInfo).toHaveProperty('token');
      expect(tokenInfo).toHaveProperty(['payload', 'sub']);
      expect(tokenInfo).toHaveProperty(['payload', 'exp']);
      expect(tokenInfo.payload.sub).toBe(userId);
      expect(tokenInfo.payload.exp).toBeLessThanOrEqual(after15Min);
      expect(tokenInfo.payload.exp).toBeGreaterThan(after15Min - 1);
    });

    test('생성된 토큰과 페이로드를 반환한다. 만료 기한을 설정할 수 있다', async () => {
      const userId = uuid4();
      const after1Min = Math.floor(+new Date() / 1000) + 1 * 60;
      const tokenInfo = await generateAccessToken(userId, 1);

      expect(tokenInfo).toHaveProperty('token');
      expect(tokenInfo).toHaveProperty(['payload', 'sub']);
      expect(tokenInfo).toHaveProperty(['payload', 'exp']);
      expect(tokenInfo.payload.sub).toBe(userId);
      expect(tokenInfo.payload.exp).toBeLessThanOrEqual(after1Min);
      expect(tokenInfo.payload.exp).toBeGreaterThan(after1Min - 1);
    });

    test('반환된 페이로드와 디코딩된 토큰의 값이 같아야한다', async () => {
      const userId = uuid4();
      const tokenInfo = await generateAccessToken(userId, 1);
      const { payload, token } = tokenInfo;

      const decoded = jwt.verify(token, 'test');
      expect(decoded).toEqual(payload);
    });
  });

  describe('액세스 토큰에서 페이로드 얻기', () => {
    test('옳지 않은 토큰의 경우 에러를 던진다', async () => {
      expect(extractPayload('wrong-token')).rejects.toBeInstanceOf(Error);
    });

    test('올바른 페이로드를 반환한다', async () => {
      const payload = { exp: Date.now(), sub: uuid4() };
      const token = jwt.sign(payload, 'test', { noTimestamp: true });
      const extractedPayload = await extractPayload(token);

      expect(extractedPayload).toEqual(payload);
    });
  });

  describe('리프레시 토큰 생성', () => {
    test('긴 문자열을 반환한다', async () => {
      const refreshToken = await generateRefreshToken('dummy-data');
      expect(refreshToken.length).toBeGreaterThan(55);
    });
  });
});
