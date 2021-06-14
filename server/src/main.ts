import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { GraphqlAuthGuard } from './modules/auth/guards/graphql-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    credentials: true,
    origin: true,
  });

  app.useGlobalGuards(new GraphqlAuthGuard());

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
