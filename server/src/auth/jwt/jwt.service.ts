import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/modules/user/entities/user.entity';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) { }
  login(user: User) {
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const token = this.jwtService.sign(payload)
    console.log(`payload`, payload)
    console.log(`token`, token)
    return {
      accessToken: token,
    };
  }

  getUserid(token: string): string {
    try {
      const { sub } = this.jwtService.decode(token) as JwtPayload;
      return sub;
    } catch (e) {
      throw Error(e);
    }
  }

  getTokenFromAuhorizationHeader(authorization: string): string {
    return authorization?.split(' ')[0];
  }

  verifyToken(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}
