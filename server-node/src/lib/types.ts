import { Request, Response } from 'express';
import session from 'express-session';

export type Context = {
  req: Request & { session: session.Session };
  res: Response;
  //   redis: Redis;
  //   userLoader: ReturnType<typeof createUserLoader>;
  //   updootLoader: ReturnType<typeof createUpdootLoader>;
};

export interface Type<T = any> extends Function {
  new (...args: any[]): T;
}
