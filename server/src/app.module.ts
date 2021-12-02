import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeamModule } from './modules/team/team.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ GraphQLModule.forRoot({
    autoSchemaFile: true
  }), TeamModule, UserModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
