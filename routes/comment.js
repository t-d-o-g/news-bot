const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment-controller');

router.post('/:id/delete', commentController.commentDeletePost);

module.exports = router;
