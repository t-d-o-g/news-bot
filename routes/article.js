const express = require('express');

const router = express.Router();

const articleController = require('../controllers/article-controller'); 

/* GET home page. */
router.get('/', articleController.index)

module.exports = router;
