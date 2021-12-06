import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { JwtAuthModule } from './jwt/jwt.module';

@Module({
  imports: [GoogleModule, JwtAuthModule],
})
export class AuthModule {}
