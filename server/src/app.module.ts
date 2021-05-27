import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { configService } from './modules/config/config.service';
import { ProjectModule } from './modules/project/project.module';
import { TeamModule } from './modules/team/team.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(configService.getMongoConnection(), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      cors: {
        credentials: true,
        origin: 'http://localhost:3000',
      },
      context: ({ req, res }) => ({ req, res }),
    }),
    UsersModule,
    AuthModule,
    ProjectModule,
    TeamModule,
  ],
  providers: [AppService, AuthService],
})
export class AppModule {}
