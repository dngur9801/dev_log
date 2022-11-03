const express = require('express');
const { User, Post, Image } = require('../models');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: ['title', 'content', 'id', 'writer'],
    });
    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
