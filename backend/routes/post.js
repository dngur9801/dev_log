const express = require('express');

const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router();

// 게시물 등록
router.post('/regist', async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const id = req.user.id;
    console.log(req.body);
    if (title === '') {
      return res.status(401).json('제목을 입력하세요.');
    }
    await Post.create({
      title,
      content,
      userId: id,
    });
    res.status(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
