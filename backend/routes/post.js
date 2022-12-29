const express = require('express');
const multer = require('multer');
const { Op } = require('sequelize');
const { User, Post, Image, Comment, sequelize } = require('../models');
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
      const { title, content, private } = req.body;
      if (title === '') {
        return res.status(401).send('제목을 입력하세요.');
      }
      const post = await Post.create({
        title,
        content,
        private,
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
router.get('/detail/:postId', async (req, res, next) => {
  try {
    const userId = req.user?.id;
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
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
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
    const isLike = post.dataValues.Likers.find(item => item.id === userId)
      ? 1
      : 0;
    post.dataValues.isLike = isLike;
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 수정
router.put('/', isLoggedIn, upload.single('file'), async (req, res, next) => {
  try {
    console.log('req.file : ', req.file);
    const { title, content, id, private } = req.body;
    if (title === '') {
      return res.status(401).json('제목을 입력하세요.');
    }
    await Post.update(
      {
        title,
        content,
        private,
      },
      { where: { id } }
    );
    if (req.file) {
      const image = await Image.findOne({
        where: { postId: id },
      });
      if (image) {
        await Image.update(
          {
            src: req.file.path,
          },
          { where: { postId: id } }
        );
      } else {
        await Image.create({
          src: req.file.path,
          postId: id,
        });
      }
    }
    const post = await Post.findOne({
      where: { id },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
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

// 좋아요 추가
router.post('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    await Post.increment(
      { like_count: +1 },
      { where: { id: req.params.postId } }
    );

    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 좋아요 취소
router.delete('/:postId/like', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    await Post.increment(
      { like_count: -1 },
      { where: { id: req.params.postId } }
    );
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 게시글 검색
router.get('/search', async (req, res, next) => {
  try {
    const { searchWord } = req.query;
    Op;
    const posts = await Post.findAll({
      where: {
        title: {
          [Op.like]: '%' + searchWord + '%',
        },
      },
      order: [['likeCount', 'DESC']],
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
          attributes: ['id', 'name'],
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    posts.forEach((item, idx) => {
      item.dataValues.createdAt = utils.elapsedTime(item.dataValues.createdAt);
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
