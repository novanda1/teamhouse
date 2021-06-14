import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { GraphqlAuthGuard } from './modules/auth/guards/graphql-auth.guard';
import * as cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.set();
  app.use(
    cors({
      credentials: true,
      origin: ['https://teamhouse.vercel.app', 'http://localhost:3000'],
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
