import { Request, Response } from 'express';
import { Redis } from 'ioredis';

export type Context = {
  req: Request & {
    user: {
      userId: string;
    };
  };
  res: Response;
  redis: Redis;
};

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
