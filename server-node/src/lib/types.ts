import { Request, Response } from 'express';

export type Context = {
  req: Request & { session: Express.Session };
  res: Response;
  //   redis: Redis;
  //   userLoader: ReturnType<typeof createUserLoader>;
  //   updootLoader: ReturnType<typeof createUpdootLoader>;
};

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
