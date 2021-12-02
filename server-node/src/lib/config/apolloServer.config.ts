import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import http from 'http';
import * as WebSocket from 'ws';
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

      const wss = new WebSocket.Server({ server: httpServer });

      wss.on('connection', (ws: WebSocket) => {
        ws.on('message', function incoming(data) {
          wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              console.log(`Received message ${data.toString()} from user ${JSON.stringify(client)}`);
              client.send(data.toString());
            }
          });
        });

        ws.send('Hi there, I am a WebSocket server');
      });

      httpServer.listen(Number(PORT), () => {
        console.log(chalk.green(`Server started on port ${PORT}`));
      });
    });
  }
}
