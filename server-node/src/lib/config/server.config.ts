import express from 'express';
import { ApolloServer, PubSub } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import router from '../../routes';
import helmet from 'helmet';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from '../../resolvers';
import { connect, connection } from 'mongoose';
import cors from 'cors';
import googleStrategy from '../../services/auth/google';
import { config } from 'dotenv';
import http from 'http';
import chalk from 'chalk';
import {
  ConnectionParams,
  SubscriptionServer,
} from 'subscriptions-transport-ws';
import { verifyJWT } from '../../middleware/jwt';
import { execute, subscribe } from 'graphql';

config();
export default class ServerConfig {
  static async connectDB() {
    await connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  }

  static async getExpress() {
    const pubsub = new PubSub();
    const appExpress = express();
    const schema = buildSchemaSync({
      resolvers,
      validate: false,
      pubSub: pubsub,
    });

    appExpress.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      }),
    );

    googleStrategy;

    appExpress.use(express.json());
    appExpress.use(express.urlencoded({ extended: true }));
    appExpress.set('trust proxy', 1);
    appExpress.use(cookieParser());
    appExpress.use(passport.initialize());
    appExpress.use(router);

    appExpress.use(
      helmet({
        contentSecurityPolicy:
          process.env.NODE_ENV === 'production' ? undefined : false,
      }),
    );

    appExpress.use((req: any, _: any, next: any) => {
      req.pubsub = pubsub;
      next();
    });
    appExpress.get('/', (_, res) => {
      res.json({
        error: false,
        msg: 'No errors',
      });
    });
    return { appExpress, schema };
  }

  static async startApolloServer() {
    const PORT = process.env.PORT || 80;
    this.getExpress().then(async ({ appExpress, schema }) => {
      const httpServer = http.createServer(appExpress);
      const apolloServer = new ApolloServer({
        schema,
        context: (context: any) => context,
      });

      await apolloServer.start();
      apolloServer.applyMiddleware({ app: appExpress });

      const subscriptionServer = SubscriptionServer.create(
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
        {
          server: httpServer,
          path: apolloServer.graphqlPath,
        },
      );

      // Shut down in the case of interrupt and termination signals
      // We expect to handle this more cleanly in the future. See (#5074)[https://github.com/apollographql/apollo-server/issues/5074] for reference.
      ['SIGINT', 'SIGTERM'].forEach((signal) => {
        process.on(signal, () => subscriptionServer.close());
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
