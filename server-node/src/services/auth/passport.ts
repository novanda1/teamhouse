import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { User, UserModel } from '../../schema/userSchema';

dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const existing = await UserModel.findOne({
        email: profile.emails ? profile.emails[0]?.value : '',
      });

      const user: User = existing
        ? existing
        : await UserModel.create({
            email: profile.emails && profile.emails[0]?.value,
            firstname: profile.name?.givenName,
            lastname: profile.name?.familyName,
            picture: profile.photos && profile.photos[0].value,
            bio: '',
          });

      cb(null, {
        accessToken,
        refreshToken,
        userId: user._id,
      });
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user: User, done) => {
  done(null, user);
});
