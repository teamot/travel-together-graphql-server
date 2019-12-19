import 'reflect-metadata';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '..', 'env', '.env') });

import { makeSchema } from 'nexus';
import { prisma } from './generated/prisma-client';
import { ApolloServer } from 'apollo-server';

import * as types from './resolvers';

async function startServer() {
  const schema = makeSchema({
    types,
    outputs: {
      schema: path.resolve(__dirname, './generated/nexus/schema.gql'),
      typegen: path.resolve(__dirname, './generated/nexus/types.d.ts'),
    },
  });

  const server = new ApolloServer({
    schema,
    context: { prisma },
    playground: true,
    debug: true,
  });

  const port = process.env.PORT || 4000;
  const serverInfo = await server.listen(port);
  console.log(`Server is running: ${serverInfo.url}`);
}

startServer();
