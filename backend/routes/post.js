const express = require('express');
const multer = require('multer');
const { User, Post, Image } = require('../models');
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

// 게시물 등록
router.post(
  '/regist',
  isLoggedIn,
  upload.single('file'),
  async (req, res, next) => {
    try {
      const { title, content } = req.body;
      if (title === '') {
        return res.status(401).json('제목을 입력하세요.');
      }
      console.log('req.user: ', req.user);
      const post = await Post.create({
        title,
        content,
        userId: req.user.id,
        writer: req.user.email.split('@')[0],
        viewCnt: 0,
      });
      if (req.file) {
        const image = await Image.create({
          src: req.file.path,
          postId: post.id,
        });
      }
      return res.status(200).json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);
router.get('/:postId', async (req, res, next) => {
  try {
    console.log(req.params.postId);
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    await Post.increment(
      { view_cnt: +1 },
      { where: { id: req.params.postId } }
    );
    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
