const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { email, password, re_password } = req.body;
    const emailCheck =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (!emailCheck.test(email)) {
      return res.status(401).json('이메일 형식이 맞지 않습니다.');
    }

    if (password !== re_password) {
      return res.status(401).json('동일한 패스워드를 입력해주세요.');
    }

    const exUser = await User.findOne({
      where: {
        email,
      },
    });

    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);
    await User.create({
      email,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const UserWithPost = await User.findOne({
        where: { id: user.id },
      });
      console.log('user.id : ', user.id);
      return res.status(200).json(UserWithPost);
    });
  })(req, res, next);
});

module.exports = router;
