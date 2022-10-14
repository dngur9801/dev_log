const express = require('express');
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.get(
  '/google',
  isNotLoggedIn,
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); // 로그인 인증후 돌아올 주소
  }
);

router.get(
  '/github',
  isNotLoggedIn,
  passport.authenticate('github', { scope: ['profile', 'email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    res.redirect('http://localhost:3000'); // 로그인 인증후 돌아올 주소
  }
);

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
