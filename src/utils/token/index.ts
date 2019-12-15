import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

if (process.env.NODE_ENV === 'test') {
  process.env.JWT_SECRET = 'test';
}

const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  console.log('환경변수 JWT_SECRET이 정의되어있지 않습니다.');
  process.exit(-1);
}

interface AccessTokenPayload {
  exp: number;
  sub: string;
}

interface TokenInfo {
  token: string;
  payload: AccessTokenPayload;
}

/**
 * JWT Payload
 * {
 *    exp: Expiration time in seconds since the epoch
 *    sub: subject
 * }
 */
export function generateAccessToken(userId: string, expInMinutes: number = 500): Promise<TokenInfo> {
  return new Promise((resolve, reject) => {
    const payload: AccessTokenPayload = {
      exp: Math.floor(Date.now() / 1000) + expInMinutes * 60,
      sub: userId,
    };

    jwt.sign(payload, JWT_SECRET, { noTimestamp: true }, (err: Error, token: string) => {
      return err ? reject(err) : resolve({ token, payload });
    });
  });
}

export function extractPayload(accessToken: string): Promise<AccessTokenPayload> {
  return new Promise<AccessTokenPayload>((resolve, reject) => {
    jwt.verify(accessToken, JWT_SECRET, (err, decoded) => {
      return err ? reject(err) : resolve(decoded as AccessTokenPayload);
    });
  });
}

export function generateRefreshToken(data: string | object): Promise<string> {
  return bcrypt.hash(JSON.stringify(data) + new Date(), 5);
}
