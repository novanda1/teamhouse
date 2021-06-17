import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import { connect, connection } from 'mongoose';
import passport from 'passport';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { redis } from './lib/config/redis';
import sessionOpt from './lib/config/session';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/userResolver';
import router from './routes';
import './services/auth/passport';

dotenv.config();

const PORT = process.env.PORT || 3000;

const main = async () => {
  const app: Express = express();

  /** db */
  await connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  redis.on('error', (err) => {
    console.log('Could not establish a connection with redis. ' + err);
  });
  redis.on('connect', () => {
    console.log('Connected to redis successfully');
  });

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  /** apollo */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
    }),
  });

  /** app */
  app.use(helmet());
  app.set('trust proxy', 1);
  app.use(express.json());
  app.use(cookieParser());
  app.use(session(sessionOpt));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(router);
  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
};

main();
