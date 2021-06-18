import { Router } from 'express';
import passport from 'passport';
import { config } from 'dotenv';

config();

const googleAuthRoute = Router();

googleAuthRoute.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

googleAuthRoute.get(
  '/google/redirect',
  passport.authenticate('google', { session: false }),
  (req, _) => {
    console.log(`req`, req.user);
    // res.redirect(
    //   `${process.env.FE_URL}/accessToken=${req?.user?.accessToken!}`,
    // );
  },
);

export default googleAuthRoute;
