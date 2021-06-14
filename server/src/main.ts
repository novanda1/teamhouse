import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { GraphqlAuthGuard } from './modules/auth/guards/graphql-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: ['https://teamhouse.vercel.app', 'http://localhost:3000'],
  });

  app.useGlobalGuards(new GraphqlAuthGuard());

  const PORT = process.env.PORT || 80;
  await app.listen(PORT, () =>
    console.log(`Server is listening on port ${PORT} `),
  );
}
bootstrap();
