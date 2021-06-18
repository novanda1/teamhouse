import { config } from 'dotenv';
import session from 'express-session';
import { COOKIE_NAME, __prod__ } from '../constants';
import { redis, RedisStore } from './redis';

config();

let sessionOpt: session.SessionOptions = {
  name: COOKIE_NAME,
  store: new RedisStore({
    client: redis,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    httpOnly: true,
    sameSite: 'lax', // csrf
    secure: __prod__, // cookie only works in https
  },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
};

if (__prod__)
  sessionOpt = {
    ...sessionOpt,
    cookie: {
      ...sessionOpt.cookie,
      domain: '.codeponder.com',
    },
  };

export default sessionOpt;
