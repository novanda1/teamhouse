import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GraphqlAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any) {
    return user;
  }
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

/**
 * throwing err when unauthenticated
 */
@Injectable()
export class GraphqlAuthGuardThrow extends AuthGuard('jwt') {
  getRequest(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
