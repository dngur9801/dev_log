const express = require('express');
const { User, Post, Image, Comment } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

// 댓글 작성
router.post('/regist', isLoggedIn, async (req, res, next) => {
  try {
    const { postId, content } = req.body;
    const post = await Post.findOne({
      where: { id: parseInt(postId, 10) },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content,
      postId: parseInt(postId, 10),
      userId: req.user.id,
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [
        {
          model: User,
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
