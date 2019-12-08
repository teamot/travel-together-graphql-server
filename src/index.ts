import 'reflect-metadata';
import { ApolloServer, gql } from 'apollo-server';
import { connectDB } from './db/connection';

const typeDefs = gql`
  type Query {
    ping: String!
  }
`;

const resolvers = {
  Query: {
    ping: () => {
      return 'pong';
    },
  },
};

async function startServer() {
  await connectDB();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
  });

  const port = process.env.PORT || 4000;
  const serverInfo = await server.listen(port);
  console.log(`Server is running: ${serverInfo.url}`);
}

startServer();