import { Module } from '@nestjs/common';
import { GoogleModule } from './google/google.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [GoogleModule, JwtModule],
})
export class AuthModule {}
