import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class JwtService {
  constructor(private nestjwtService: NestJwtService) {}
  login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    return {
      accessToken: this.nestjwtService.sign(payload),
    };
  }

  getUserid(token: string): string {
    try {
      const { sub } = this.nestjwtService.decode(token) as JwtPayload;
      return sub;
    } catch (e) {
      throw Error(e);
    }
  }
}
