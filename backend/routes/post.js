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
      console.log(req.body);
      console.log('req.file:', req.file);
      const { title, content } = req.body;
      if (title === '') {
        return res.status(401).json('제목을 입력하세요.');
      }
      const post = await Post.create({
        title,
        content,
        userId: req.user.id,
      });
      if (req.file) {
        const image = await Image.create({
          src: req.file.path,
          postId: post.id,
        });
      }
      return res.status(200);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
