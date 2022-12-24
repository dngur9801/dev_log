const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');
const dotenv = require('dotenv');
const { location } = require('../utils');

dotenv.config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET,
        callbackURL: `${location()}/auth/kakao/callback`,
        passReqToCallback: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log('profile :', profile);
          const exUser = await User.findOne({
            where: { email: profile?.emails[0].value, provider: 'kakao' },
          });

          if (exUser) {
            req._user = exUser;
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile?.emails[0].value,
              name: profile?.emails[0].value.split('@')[0],
              provider: 'kakao',
            });
            req._user = exUser;
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
