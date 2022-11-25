const passport = require('passport');

const local = require('./local');
const google = require('./google');
const github = require('./github');
const kakao = require('./kakao');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      if (user?.name) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
  google();
  github();
  kakao();
};
