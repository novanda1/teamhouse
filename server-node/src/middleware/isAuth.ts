import { MiddlewareFn } from 'type-graphql';
import { Context } from '../lib/types';

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  console.log(`context.req.session`, context.req.session);
  if (
    !context.req.session ||
    !context.req.session.passport ||
    !context.req.session.passport.user.userId
  ) {
    throw new Error('not authenticated');
  }

  return next();
};
