const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 유저 정보
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userInfo = await User.findOne({
        where: { id: req.user.id },
        attributes: ['id', 'email', 'name', 'profileImage', 'blogName'],
      });

      res.status(200).json(userInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    if (req.params.userId) {
      const userInfo = await User.findOne({
        where: { id: req.params.userId },
        attributes: ['id'],
      });

      res.status(200).json(userInfo);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그아웃
router.post('/logout', isLoggedIn, (req, res) => {
  req.session.destroy(function (err) {
    if (err) throw err;
    res.send('ok');
  });
});

// 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
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
    await User.create({
      email,
      name: email.split('@')[0],
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 로그인
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
      return res.status(200).json(UserWithPost);
    });
  })(req, res, next);
});

// 회원 기본정보
router.post('/regist', isNotLoggedIn, async (req, res, next) => {
  try {
    const { userId, nickName, name } = req.body;
    const user = await User.findOne({
      where: { name },
    });
    if (nickName !== '' || name !== '') {
      return res.status(400).send('필수값을 입력해주세요');
    }
    if (user) {
      return res.status(401).send('이미 사용중인 아이디 입니다.');
    }
    await User.update(
      {
        nickName,
        name,
      },
      {
        where: { id: userId },
      }
    );
    res.status(200).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 마이페이지 정보
router.get('/mypage', isLoggedIn, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { id: req.user.id },
      include: [
        {
          model: Image,
          attributes: ['src'],
        },
        {
          model: User,
          attributes: ['profileImage', 'name'],
        },
        {
          model: Comment,
          attributes: ['content'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
