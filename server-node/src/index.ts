import 'reflect-metadata';
import { ApolloServerConfig } from './lib/config/apolloServer.config';
import ServerConfig from './lib/config/server.config';

const main = async () => {
  await ServerConfig.connectDB();
  await ApolloServerConfig.start();
};

main();
