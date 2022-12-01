const express = require('express');
const { User, Post, Image, Comment, sequelize } = require('../models');
const utils = require('../utils');
const router = express.Router();

// 전체 게시글
router.get('/', async (req, res, next) => {
  try {
    const { sort } = req.query;
    let order = [];
    if (sort === 'popular') {
      order = [['likeCount', 'DESC']];
    } else {
      order = [['createdAt', 'DESC']];
    }
    const posts = await Post.findAll({
      where: { private: 0 },
      order,
      include: [
        {
          model: Image,
          attributes: ['src'],
        },
        {
          model: User,
          attributes: ['profileImage', 'name', 'createdAt'],
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
    // 날짜 변환
    posts.forEach((item, idx) => {
      item.dataValues.createdAt = utils.elapsedTime(item.dataValues.createdAt);
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
