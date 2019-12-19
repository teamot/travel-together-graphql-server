import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';
import e from 'express';
import { newDataLoaders } from './dataLoaders';
import { extractPayload } from '../utils/token';
import { Prisma } from '../generated/prisma-client';

export interface Context {
  prisma: Prisma;
  // userId: string;
  // dataLoaders: ReturnType<typeof newDataLoaders>;
}

// function getAccessToken(req: e.Request): string | undefined {
//   const authHeader = req.header('Authorization');
//   if (!authHeader) return undefined;

//   const [tokenType, token] = authHeader.split(' ');
//   if (token && tokenType.toUpperCase() === 'BEARER') {
//     return token;
//   }

//   return undefined;
// }

// export async function generateContext(expressContext: ExpressContext): Promise<Context> {
//   const token = getAccessToken(expressContext.req);
//   const context: Context = { userId: '', dataLoaders: newDataLoaders() };
//   if (token) {
//     try {
//       const payload = await extractPayload(token);
//       context.userId = payload.sub;
//     } catch (err) {}
//   }

//   return context;
// }
