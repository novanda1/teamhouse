import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import session from 'express-session';
import helmet from 'helmet';
import Redis from 'ioredis';
import { connect, connection } from 'mongoose';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { COOKIE_NAME, __prod__ } from './lib/constants';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/userResolver';

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

  /** redis */
  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: process.env.REDIS_HOSTNAME,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
  });

  redis.on('error', (err) => {
    console.log('Could not establish a connection with redis. ' + err);
  });
  redis.on('connect', () => {
    console.log('Connected to redis successfully');
  });

  /** apollo */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  /** session opt */
  let sessionOpt: session.SessionOptions = {
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redis,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
      httpOnly: true,
      sameSite: 'lax', // csrf
      secure: __prod__, // cookie only works in https
    },
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    resave: false,
  };

  if (__prod__)
    sessionOpt = {
      ...sessionOpt,
      cookie: {
        ...sessionOpt.cookie,
        domain: '.codeponder.com',
      },
    };

  /** app */
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );
  app.set('trust proxy', 1);
  app.use(session(sessionOpt));
  app.use(helmet());
  app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
};

main();
