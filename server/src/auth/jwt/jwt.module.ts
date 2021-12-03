import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as NestJwt } from '@nestjs/jwt';
import { JwtService } from './jwt.service';
import { JwtAuthStrategy } from './jwt.strategy';

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
  providers: [JwtService, JwtAuthStrategy],
  exports: [NestJwt, JwtService],
})
export class JwtModule {}
