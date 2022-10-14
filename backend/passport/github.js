const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { User } = require('../models');
const dotenv = require('dotenv');

dotenv.config();

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/github/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(22222222222);
          console.log('profile : ', profile);
          const exUser = await User.findOne({
            where: { email: profile.username, provider: 'github' },
          });

          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.username,
              provider: 'github',
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
