import { PubSub } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { connect, connection } from 'mongoose';
import passport from 'passport';
import { buildSchemaSync } from 'type-graphql';
import { resolvers } from '../../resolvers';
import router from '../../routes';
import googleStrategy from '../../services/auth/google';

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
        origin: [process.env.CORS_ORIGIN, "https://studio.apollographql.com"],
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
}
