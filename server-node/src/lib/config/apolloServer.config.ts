import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import http from 'http';
import ServerConfig from './server.config';

export class ApolloServerConfig extends ServerConfig {
  static async start() {
    const PORT = process.env.PORT || 80;
    this.getExpress().then(async ({ appExpress, schema }) => {
      const httpServer = http.createServer(appExpress);
      const apolloServer = new ApolloServer({
        schema,
        context: (context: any) => context,
      });

      apolloServer.applyMiddleware({ app: appExpress });

      httpServer.listen(Number(PORT), () => {
        console.log(chalk.green(`Server started on port ${PORT}`));
      });
    });
  }
}
