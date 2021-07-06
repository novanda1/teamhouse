import dotenv from 'dotenv';
import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { generateAccessToken } from '../../lib/utils/jwt';
import { uniqueUsername } from '../../lib/utils/uniqueUsername';
import { User, UserModel } from '../../schema/user.schema';

dotenv.config();
const googleStrategy = passport;

googleStrategy.use(
  new Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (__, _, profile, cb) => {
      const existing = await UserModel.findOne({
        email: profile.emails ? profile.emails[0]?.value : '',
      });

      const user: User = existing
        ? existing
        : await UserModel.create({
            username: await uniqueUsername(
              profile.name?.givenName + ' ' + profile.name?.familyName,
            ),
            email: profile.emails && profile.emails[0]?.value,
            firstname: profile.name?.givenName,
            lastname: profile.name?.familyName,
            picture: profile.photos && profile.photos[0].value,
            bio: '',
          });

      const token = generateAccessToken({ userId: user._id });

      cb(null, {
        token,
        userId: user._id,
      });
    },
  ),
);

googleStrategy.serializeUser((user, done) => {
  done(null, user);
});

googleStrategy.deserializeUser((user: User, done) => {
  done(null, user);
});

export default googleStrategy;
