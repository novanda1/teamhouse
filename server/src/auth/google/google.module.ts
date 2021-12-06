import { Module } from '@nestjs/common';
import { UserModule } from 'src/modules/user/user.module';
import { JwtAuthModule } from '../jwt/jwt.module';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService, GoogleStrategy],
  imports: [UserModule, JwtAuthModule],
})
export class GoogleModule {}
