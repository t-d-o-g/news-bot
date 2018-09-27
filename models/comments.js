const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  title: String,
  body: String,
});

const comments = mongoose.model('comments', CommentSchema);

module.exports = comments;
