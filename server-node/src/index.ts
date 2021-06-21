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
import sessionOpt from './lib/config/session';
import { __prod__ } from './lib/constants';
import { HelloResolver } from './resolvers/hello';
import { TeamResolver } from './resolvers/teamResolver';
import { UserResolver } from './resolvers/userResolver';
import router from './routes';
import './services/auth/google';

dotenv.config();

const PORT = process.env.PORT || 80;

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

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    }),
  );

  /** apollo */
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver, TeamResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  /** app */
  app.use(helmet());
  app.set('trust proxy', 1);
  app.use(express.json());
  app.use(cookieParser());
  if (!__prod__) app.use(session(sessionOpt));
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
