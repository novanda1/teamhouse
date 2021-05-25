import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expireIn },
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
