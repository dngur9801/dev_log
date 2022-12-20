const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;
const { User } = require('../models');
const dotenv = require('dotenv');
const { location } = require('../utils');

dotenv.config();

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: `${location()}/auth/naver/callback`,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { email: profile._json.email, provider: 'naver' },
          });
          if (exUser) {
            req._user = exUser;
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json.email,
              profileImage: profile._json.profile_image,
              provider: 'naver',
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
