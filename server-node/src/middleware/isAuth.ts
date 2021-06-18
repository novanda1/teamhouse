import { MiddlewareFn } from 'type-graphql';
import { Context } from '../lib/types';

export const isAuth: MiddlewareFn<Context> = (_, next) => {
  // if (
  //   !context.req.session ||
  //   !context.req.session.passport ||
  //   !context.req.session.passport.user.userId
  // ) {
  //   throw new Error('not authenticated');
  // }

  return next();
};
