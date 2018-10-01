const express = require('express');

const router = express.Router();

const articleController = require('../controllers/article-controller');

router.post('/:id', articleController.commentCreatePost)

module.exports = router;
