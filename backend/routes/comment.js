const express = require('express');
const { User, Post, Image, Comment } = require('../models');
const utils = require('../utils');
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
          attributes: ['name', 'profileImage'],
        },
      ],
    });
    // 날짜 변환
    fullComment.dataValues.createdAt = utils.elapsedTime(
      fullComment.dataValues.createdAt
    );
    res.status(201).json(fullComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 수정
router.put('/', isLoggedIn, async (req, res, next) => {
  try {
    const { commentId, content } = req.body;

    console.log('commentId : ', commentId, 'content :', content);
    await Comment.update(
      {
        content: content,
      },
      { where: { id: commentId } }
    );

    const editComment = await Comment.findOne({
      where: { id: commentId },
      include: [
        {
          model: User,
          attributes: ['name', 'profileImage'],
        },
      ],
    });
    // 날짜 변환
    editComment.dataValues.createdAt = utils.elapsedTime(
      editComment.dataValues.createdAt
    );
    res.status(201).json(editComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 댓글 삭제
router.delete('/:commentId', isLoggedIn, async (req, res, next) => {
  try {
    console.log('req.params', req.params);
    await Comment.destroy({
      where: {
        id: req.params.commentId,
        userId: req.user.id,
      },
    });
    res.status(200).json({ CommentId: parseInt(req.params.CommentId) });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
module.exports = router;
