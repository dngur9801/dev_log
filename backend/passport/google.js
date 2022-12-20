const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');
const dotenv = require('dotenv');
const { location } = require('../utils');

dotenv.config();

module.exports = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${location()}/auth/google/callback`,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { email: profile?.emails[0].value, provider: 'google' },
          });

          if (exUser) {
            req._user = exUser;
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile?.emails[0].value,
              profileImage: profile.photos[0].value,
              provider: 'google',
            });
            req._user = newUser;
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
