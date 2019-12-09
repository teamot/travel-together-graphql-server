import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import e from 'express';
import { extractPayload } from './utils/token';

export interface Context {
  userId?: string;
}

function getAccessToken(req: e.Request): string | undefined {
  const authHeader = req.header('Authorization');
  if (!authHeader) return undefined;

  const [tokenType, token] = authHeader.split(' ');
  if (token && tokenType.toUpperCase() === 'BEARER') {
    return token;
  }

  return undefined;
}

export async function generateContext(expressContext: ExpressContext): Promise<Context> {
  const token = getAccessToken(expressContext.req);
  console.log('token:', token);

  const context: Context = {};
  if (token) {
    try {
      const payload = await extractPayload(token);
      context.userId = payload.sub;
    } catch (err) {}
  }

  console.log('context:', context);
  return context;
}
