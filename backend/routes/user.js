const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const multer = require('multer');

const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const utils = require('../utils');
const { location } = require('../utils');

const router = express.Router();

// multer 셋팅
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // 콜백 함수로 업로드 파일의 저장 위치를 설정한다.
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // 콜백 함수로 파일이 저장될 때 이름을 설정한다.
  },
});

const upload = multer({ storage: storage });

// 유저 정보
router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userInfo = await User.findOne({
        where: { id: req.user.id },
        attributes: [
          'id',
          'email',
          'name',
          'blogName',
          'profileImage',
          'nickName',
          'introduce',
        ],
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
  req.session.destroy(err => {
    if (err) throw err;
    res.clearCookie('user_auth', { path: '/' });
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
      if (info.notName) {
        return res.json({ notName: true, id: user.id });
      }
      return res.status(401).send(info.reason);
    }
    return req.login(user, async loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      const userData = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
      });
      return res.status(200).json(userData);
    });
  })(req, res, next);
});

// 회원 기본정보 등록
router.post('/regist', isNotLoggedIn, async (req, res, next) => {
  try {
    const { userId, nickName, name, introduce } = req.body;

    const isUser = await User.findOne({
      where: { id: userId },
    });
    if (!userId || !name || !isUser || isUser.name) {
      return res.status(400).send('잘못된 요청입니다.');
    }
    const isUserName = await User.findOne({
      where: { name },
    });
    if (nickName === '' || name === '') {
      return res.status(400).send('필수값을 입력해주세요');
    }
    if (isUserName) {
      return res.status(401).send('이미 사용중인 아이디 입니다.');
    }
    await User.update(
      {
        nickName,
        name,
        introduce,
      },
      {
        where: { id: userId },
      }
    );
    req.session.passport = { user: Number(userId) };
    req.session.save();
    res.status(200).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 유저블로그 정보
router.get('/posts', async (req, res, next) => {
  try {
    let postWhere;
    if (req.user?.name !== req.query.name) {
      postWhere = { private: 0 };
    }
    const user = await User.findOne({
      where: { name: req.query.name },
      include: [
        {
          model: Post,
          order: [['createdAt', 'DESC']],
          where: postWhere,
          include: [
            {
              model: Image,
              attributes: ['src'],
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
        },
      ],
    });
    user.dataValues.posts.forEach((item, idx) => {
      item.dataValues.createdAt = utils.elapsedTime(item.dataValues.createdAt);
    });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 유저 정보 수정
router.put('/edit/profile', isLoggedIn, async (req, res, next) => {
  try {
    const { nickName, introduce } = req.body;
    await User.update(
      {
        nickName,
        introduce,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).send('프로필 변경 완료');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 유저 블로그 제목 수정
router.put('/edit/subject', isLoggedIn, async (req, res, next) => {
  try {
    const { blogName } = req.body;
    await User.update(
      {
        blogName,
      },
      {
        where: { id: req.user.id },
      }
    );
    res.status(200).send('프로필 변경 완료');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 프로필 이미지 수정
router.put(
  '/image',
  isLoggedIn,
  upload.single('file'),
  async (req, res, next) => {
    try {
      const { blogName } = req.body;
      await User.update(
        {
          profileImage:
            process.env.NODE_ENV === 'production'
              ? `${process.env.API_ADDRESS}/${req.file.path}`
              : `http://localhost:5000/${req.file.path}`,
        },
        {
          where: { id: req.user.id },
        }
      );
      res.status(200).json(req.file.path);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 회원 탈퇴
router.post('/out', isLoggedIn, async (req, res, next) => {
  try {
    await User.destroy({
      where: { id: req.user.id },
    });
    res.status(200).send('회원 탈퇴 완료');
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
