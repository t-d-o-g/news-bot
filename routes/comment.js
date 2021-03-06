const express = require('express');

const router = express.Router();

const commentController = require('../controllers/comment-controller');

router.delete('/:id', commentController.commentDelete);

module.exports = router;
