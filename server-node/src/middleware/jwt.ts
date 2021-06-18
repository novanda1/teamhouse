import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { __prod__ } from '../lib/constants';
import { Context } from '../lib/types';

config();

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  if (
    !context.req.session ||
    !context.req.session.passport ||
    !context.req.session.passport.user.userId
  ) {
    throw new Error('not authenticated');
  }

  return next();
};

export const JWT: MiddlewareFn<Context> = ({ context }, next) => {
  const authHeader = context.req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) throw new Error('not authenticated');

  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      __prod__ ? process.env.JWT_SECRET : 'secretlah',
      (err: any, user: any) => {
        console.log(err);

        if (err) {
          reject(false);
          return context.res.sendStatus(403);
        }

        context.req.user = user;

        resolve(true);
        return next();
      },
    );
  });
};
