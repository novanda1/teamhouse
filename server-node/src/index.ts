import dotenv from 'dotenv';
import 'reflect-metadata';
import ServerConfig from './lib/config/server.config';

dotenv.config();

const main = async () => {
  await ServerConfig.connectDB();
  await ServerConfig.startApolloServer();
};

main();
