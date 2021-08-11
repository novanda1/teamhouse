import { ApolloServer } from 'apollo-server-express';
import chalk from 'chalk';
import { execute, subscribe } from 'graphql';
import { GRAPHQL_TRANSPORT_WS_PROTOCOL } from 'graphql-ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import {
  ConnectionParams,
  GRAPHQL_WS,
  SubscriptionServer,
} from 'subscriptions-transport-ws';
import ws from 'ws';
import { verifyJWT } from '../../middleware/jwt';
import ServerConfig from './server.config';

export class ApolloServerConfig extends ServerConfig {
  static async start() {
    const PORT = process.env.PORT || 80;
    this.getExpress().then(async ({ appExpress, schema }) => {
      // graphql-ws
      const graphqlWs = new ws.Server({ noServer: true });
      useServer(
        {
          schema,
          onConnect(connectionParams: ConnectionParams) {
            if (connectionParams.authToken) {
              const verified = verifyJWT(connectionParams.authToken);

              if (verified) return verified;
              else throw new Error('WS token not verified');
            }

            throw new Error('WS token not provided');
          },
          onDisconnect() {},
        },
        graphqlWs,
      );

      // subscriptions-transport-ws
      const subTransWs = new ws.Server({ noServer: true });
      SubscriptionServer.create(
        {
          schema,
          execute,
          subscribe,
          onConnect(connectionParams: ConnectionParams) {
            if (connectionParams.authToken) {
              const verified = verifyJWT(connectionParams.authToken);

              if (verified) return verified;
              else throw new Error('WS token not verified');
            }

            throw new Error('WS token not provided');
          },
          onDisconnect() {},
        },
        subTransWs,
      );

      const httpServer = http.createServer(appExpress);
      const apolloServer = new ApolloServer({
        schema,
        context: (context: any) => context,
      });

      apolloServer.applyMiddleware({ app: appExpress });

      httpServer.on('upgrade', (req, socket, head) => {
        // extract websocket subprotocol from header
        const protocol = req.headers['sec-websocket-protocol'];
        const protocols = Array.isArray(protocol)
          ? protocol
          : protocol?.split(',').map((p: any) => p.trim());

        // decide which websocket server to use
        const wss =
          protocols?.includes(GRAPHQL_WS) && // subscriptions-transport-ws subprotocol
          !protocols.includes(GRAPHQL_TRANSPORT_WS_PROTOCOL) // graphql-ws subprotocol
            ? subTransWs
            : // graphql-ws will welcome its own subprotocol and
              // gracefully reject invalid ones. if the client supports
              // both transports, graphql-ws will prevail
              graphqlWs;
        wss.handleUpgrade(req, socket, head, (ws) => {
          wss.emit('connection', ws, req);
        });
      });

      httpServer.listen(Number(PORT), () => {
        console.log(chalk.green(`Server started on port ${PORT}`));
        console.log(
          chalk.greenBright(
            `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`,
          ),
        );
      });
    });
  }
}
