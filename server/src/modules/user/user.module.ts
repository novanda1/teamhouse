import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  providers: [UserResolver, UserService, ...usersProviders],
})
export class UserModule {}
