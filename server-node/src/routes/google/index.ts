import { Router } from 'express';
import passport from 'passport';
import { config } from 'dotenv';

config();

const googleAuthRoute = Router();

googleAuthRoute.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  }),
);

googleAuthRoute.get(
  '/google/redirect',
  passport.authenticate('google'),
  (_, res) => {
    res.redirect(process.env.FE_URL);
  },
);

export default googleAuthRoute;
