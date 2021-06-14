import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { GraphqlAuthGuard } from './modules/auth/guards/graphql-auth.guard';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { __prod__ } from './constants';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.use(
    cors({
      credentials: true,
      origin: ['https://teamhouse.vercel.app', 'http://localhost:3000'],
    }),
  );

  app.use(
    session({
      name: 'ses',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? '.codeponder.com' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    }),
  );

  // app.enableCors({
  //   credentials: true,
  //   origin: ['https://teamhouse.vercel.app', 'http://localhost:3000'],
  // });

  app.useGlobalGuards(new GraphqlAuthGuard());
  app.use(cookieParser());

  const PORT = process.env.PORT || 80;
  await app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT} `),
  );
}
bootstrap();
