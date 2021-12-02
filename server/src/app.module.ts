import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './modules/team/team.module';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { GoogleModule } from './google/google.module';

@Module({
  imports: [ GraphQLModule.forRoot({
    autoSchemaFile: true
  }), TeamModule, UserModule, DatabaseModule, GoogleModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
