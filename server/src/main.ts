import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as session from 'express-session';
import { AppModule } from './app.module';
import { __prod__ } from './constants';
import { GraphqlAuthGuard } from './modules/auth/guards/graphql-auth.guard';

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
        domain: __prod__ ? 'https://teamhouse.vercel.app/' : undefined,
      },
      saveUninitialized: false,
      secret: 'secret',
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
