import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class JwtService {
  constructor(private nestjwtService: NestJwtService) {}
  login(user) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.nestjwtService.sign(payload),
    };
  }
}
