const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment-controller');

router.get('/comment/create', commentController.commentCreateGet);

router.post('/comment/create', commentController.commentCreatePost)

router.post('/comment:id/delete', commentController.commentDeletePost);

module.exports = router;