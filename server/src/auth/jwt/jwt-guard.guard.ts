import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtservice: JwtService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    /**  eslint-disable-next-line
     @ts-ignore */
    const headers = context.switchToHttp().args[2]?.req.headers;
    /**  eslint-disable-next-line
     @ts-ignore */
    const authorization = headers?.authorization;
    const token = authorization.split(' ')[1];

    try {
      this.jwtservice.verify(token);
    } catch {
      return false;
    }

    return true;
  }
}
