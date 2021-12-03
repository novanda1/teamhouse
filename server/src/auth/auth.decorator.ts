import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const context = GqlExecutionContext.create(ctx);
    const authorization = context.getContext().req.headers?.authorization;
    const token = authorization.split(' ')[1];

    return token;
  },
);
