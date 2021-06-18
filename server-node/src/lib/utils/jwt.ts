import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { __prod__ } from '../constants';

config();

export const generateAccessToken = (payload: { [key: string]: any }) => {
  return jwt.sign(payload, __prod__ ? process.env.JWT_SECRET : 'secretlah', {
    expiresIn: '2d',
  });
};
