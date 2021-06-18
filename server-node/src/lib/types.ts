import { Request, Response } from 'express';
import session from 'express-session';
import { Redis } from 'ioredis';

export type Context = {
  req: Request & {
    session: session.Session & {
      passport: {
        user: { [key: string]: any };
      };
    };
  };
  res: Response;
  redis: Redis;
};

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
