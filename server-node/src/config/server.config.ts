import express from 'express';
import { PubSub } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import router from '../routes';
import helmet from 'helmet';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from '../resolvers';
import { connect, connection } from 'mongoose';
import cors from 'cors';
import googleStrategy from '../services/auth/google';

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

    googleStrategy;

    appExpress.use(express.json());
    appExpress.use(express.urlencoded({ extended: true }));
    appExpress.set('trust proxy', 1);
    appExpress.use(cookieParser());
    appExpress.use(passport.initialize());
    appExpress.use(router);
    appExpress.use(
      cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
      }),
    );
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
}
