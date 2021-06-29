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
      const apolloServer = new ApolloServer({
        schema,
        context: (context: any) => context,
        subscriptions: {
          onConnect() {},
          onDisconnect() {},
        },
      });
      apolloServer.applyMiddleware({ app: appExpress });
      const httpServer = http.createServer(appExpress);
      apolloServer.installSubscriptionHandlers(httpServer);

      const sleep = (n: number) =>
        new Promise((resolve) => setTimeout(resolve, n));

      /**
       * @todo make it better
       */
      console.log('sleeping and waiting installSubscriptionHandlers done :)');

      sleep(10000).then(() => {
        httpServer.listen(Number(PORT), () => {
          console.log(chalk.green(`Server started on port ${PORT}`));
          console.log(
            chalk.greenBright(
              `🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`,
            ),
          );
        });
      });
    });
  }
}
