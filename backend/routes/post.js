const express = require('express');
const multer = require('multer');
const { User, Post, Image, Comment } = require('../models');
const utils = require('../utils');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
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

// 게시글 등록
router.post(
  '/regist',
  isLoggedIn,
  upload.single('file'),
  async (req, res, next) => {
    try {
      const { title, content } = req.body;
      if (title === '') {
        return res.status(401).send('제목을 입력하세요.');
      }
      const post = await Post.create({
        title,
        content,
        userId: req.user.id,
        writer: req.user.email.split('@')[0],
        viewCnt: 0,
      });
      if (req.file) {
        await Image.create({
          src: req.file.path,
          postId: post.id,
        });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

// 게시글 상세페이지
router.get('/:postId', async (req, res, next) => {
  try {
    console.log(req.params.postId);
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Image,
          attributes: ['src'],
        },
        {
          model: Comment,
          attributes: {
            exclude: ['updatedAt', 'postId', 'userId'],
          },
          include: [
            {
              model: User,
              attributes: ['name', 'profileImage'],
            },
          ],
        },
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    await Post.increment(
      { view_cnt: +1 },
      { where: { id: req.params.postId } }
    );
    // 날짜 변환
    post.dataValues.createdAt = utils.elapsedTime(post.dataValues.createdAt);
    post.dataValues.comments.forEach((item, idx) => {
      item.dataValues.createdAt = utils.elapsedTime(item.dataValues.createdAt);
    });
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 수정
router.put('/', isLoggedIn, upload.single('file'), async (req, res, next) => {
  try {
    const { title, content, id } = req.body;
    if (title === '') {
      return res.status(401).json('제목을 입력하세요.');
    }
    const post = await Post.update(
      {
        title,
        content,
      },
      { where: { id } }
    );
    if (req.file) {
      const image = await Image.update(
        {
          src: req.file.path,
        },
        { where: { postId: id } }
      );
    }
    res.status(201).json(null);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    console.log('req.body', req.params.postId);
    await Post.destroy({
      where: {
        id: req.params.postId,
        userId: req.user.id,
      },
    });
    res.status(200).json({ postId: parseInt(req.params.postId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
