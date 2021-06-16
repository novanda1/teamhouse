import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import helmet from 'helmet';
import { connect, connection } from 'mongoose';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { UserResolver } from './resolvers/userResolver';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app: Express = express();

const main = async () => {
  const conn = await connect(process.env.DATABASE_URL as string, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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

  app.use(helmet());
  app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));
};

main();
