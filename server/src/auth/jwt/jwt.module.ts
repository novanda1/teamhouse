import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwt } from '@nestjs/jwt';
import { JwtAuthService } from './jwt.service';
import { JwtAuthStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    NestJwt.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [JwtAuthService, JwtAuthStrategy],
  exports: [NestJwt, JwtAuthService],
})
export class JwtAuthModule {}
