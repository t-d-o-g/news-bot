const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment-controller');

router.get('/', commentController.commentGet);

router.post('/:id/delete', commentController.commentDeletePost);

module.exports = router;
