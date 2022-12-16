const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// google 로그인
router.get(
  '/google',
  isNotLoggedIn,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    if (!req._user.name) {
      res.redirect(
        `http://localhost:3000/regist?auth=google&id=${req._user.id}`
      );
    } else {
      res.redirect('http://localhost:3000');
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
    failureRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    if (!req._user.name) {
      res.redirect(
        `http://localhost:3000/regist?auth=github&id=${req._user.id}`
      );
    } else {
      res.redirect('http://localhost:3000');
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
    failureRedirect: 'http://localhost:3000',
  }),
  (req, res) => {
    if (!req._user.name) {
      res.redirect(
        `http://localhost:3000/regist?auth=naver&id=${req._user.id}`
      );
    } else {
      res.redirect('http://localhost:3000');
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
  passport.authenticate('kakao', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); // 로그인 인증후 돌아올 주소
  }
);

module.exports = router;
