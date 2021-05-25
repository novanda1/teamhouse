import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { configService } from './config/config.service';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(configService.getMongoConnection(), {
      useNewUrlParser: true,
      useCreateIndex: true,
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
