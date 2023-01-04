const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const { User } = require('../models');
const dotenv = require('dotenv');
const { location } = require('../utils');

dotenv.config();

module.exports = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: `${location()}/auth/github/callback`,
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            where: { email: profile.username, provider: 'github' },
          });
          if (exUser) {
            req._user = exUser;
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile.username,
              profileImage: profile.photos[0].value,
              provider: 'github',
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
