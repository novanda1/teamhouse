import connectRedis from 'connect-redis';
import { config } from 'dotenv';
import session from 'express-session';
import Redis from 'ioredis';

config();

export const RedisStore = connectRedis(session);
export const redis = new Redis({
  host: process.env.REDIS_HOSTNAME,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
