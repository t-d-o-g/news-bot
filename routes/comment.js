const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment-controller');

router.get('/create', commentController.commentCreateGet);

router.post('/:id/delete', commentController.commentDeletePost);

module.exports = router;