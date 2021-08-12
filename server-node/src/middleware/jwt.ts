import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { __prod__ } from '../lib/constants';
import { Context } from '../lib/types';

config();

export const verifyJWT = async (
  token: string,
  callback?: jwt.VerifyCallback<jwt.JwtPayload> | undefined,
) => {
  const verify = await jwt.verify(
    token,
    __prod__ ? process.env.JWT_SECRET : 'secretlah',
    callback
      ? callback
      : (err: any) => {
          if (err) return false;
          return true;
        },
  );

  return verify as unknown as boolean;
};

export const JWT: MiddlewareFn<Context> = async ({ context }, next) => {
  const authHeader = context.req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) throw new Error('not authenticated');

  const verify = verifyJWT(token, (err: any, user: any) => {
    console.log(err);

    if (err) {
      return context.res.sendStatus(403);
    }

    context.req.user = user;

    return next();
  });

  return await verify;
};
