const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: 'http://localhost:5000/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(123124);
        console.log('profile : ', profile);
        try {
          const exUser = await User.findOne({
            where: { email: profile?.emails[0].value, provider: 'kakao' },
          });

          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile?.emails[0].value,
              provider: 'kakao',
            });
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
