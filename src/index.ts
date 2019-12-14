import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', 'env', '.env') });

import { ApolloServer } from 'apollo-server';
import { connectDB } from './db/connection';
import { OAuthResolver } from './modules/oauth/resolver';
import { buildSchema } from 'type-graphql';
import { generateContext } from './context';
import { UserResolver } from './modules/user/resolver';
import { authChecker } from './utils/auth-checker';
import { CountryResolver } from './modules/country/resolver';
import { TravelRoomResolver } from './modules/travel-room/resolver';

async function startServer() {
  await connectDB();

  const schema = await buildSchema({
    resolvers: [OAuthResolver, UserResolver, CountryResolver, TravelRoomResolver],
    authChecker,
  });

  const server = new ApolloServer({
    schema,
    context: generateContext,
    playground: true,
    debug: true,
  });

  const port = process.env.PORT || 4000;
  const serverInfo = await server.listen(port);
  console.log(`Server is running: ${serverInfo.url}`);
}

startServer();
