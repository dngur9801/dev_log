const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();
const location =
  process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_ADDRESS
    : 'http://localhost:3000';

// google 로그인
router.get(
  '/google',
  isNotLoggedIn,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: location }),
  (req, res) => {
    if (!req._user.name) {
      res.redirect(`${location}/regist?auth=google&id=${req._user.id}`);
    } else {
      res.redirect(location);
    }
  }
);

// github 로그인
router.get(
  '/github',
  isNotLoggedIn,
  passport.authenticate('github', { scope: ['profile', 'email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: location,
  }),
  (req, res) => {
    if (!req._user.name) {
      res.redirect(`${location}/regist?auth=github&id=${req._user.id}`);
    } else {
      res.redirect(location);
    }
  }
);

// naver 로그인
router.get(
  '/naver',
  isNotLoggedIn,
  passport.authenticate('naver', { scope: ['profile', 'email'] })
);

router.get(
  '/naver/callback',
  passport.authenticate('naver', {
    failureRedirect: location,
  }),
  (req, res) => {
    if (!req._user.name) {
      res.redirect(`${location}/regist?auth=naver&id=${req._user.id}`);
    } else {
      res.redirect(location);
    }
  }
);

// kakao 로그인
router.get(
  '/kakao',
  isNotLoggedIn,
  passport.authenticate('kakao', { scope: ['profile', 'email'] })
);

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', { failureRedirect: location }),
  (req, res) => {
    res.redirect(location); // 로그인 인증후 돌아올 주소
  }
);

module.exports = router;
