import chalk from 'chalk';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import 'reflect-metadata';
import http from 'http';
import ServerConfig from './config/server.config';

dotenv.config();
const PORT = process.env.PORT || 80;

const main = async () => {
  await ServerConfig.connectDB();
  ServerConfig.getExpress()
    .then(({ appExpress, schema }) => {
      const server = new ApolloServer({
        schema,
        context: (context) => context,
        subscriptions: {
          onConnect() {},
          onDisconnect() {},
        },
      });
      server.applyMiddleware({ app: appExpress, path: '/graphql' });
      const httpServer = http.createServer(appExpress);
      server.installSubscriptionHandlers(httpServer);

      httpServer.listen(Number(PORT), () => {
        console.log(chalk.green(`Server started on port ${PORT}`));
      });
    })
    .catch((_) => {
      console.log(chalk.red(`Unable to start server on port ${PORT}`));
    });
};

main();
