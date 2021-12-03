import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type JwtPayload = { sub: string; email: string };

const headerExtractor = (req: Request): string | null => {
  let token = null;

  if (req && req.headers) {
    token = req.headers['authentication'];
  }

  return token ? token : ExtractJwt.fromAuthHeaderAsBearerToken();
};

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: headerExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    return { id: payload.sub, username: payload.email };
  }
}
