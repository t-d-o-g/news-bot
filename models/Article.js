const mongoose = require('mongoose');

const { Schema } = mongoose;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const autoPopulateComments = function cb(next) {
  this.populate('comments');
  next();
};

ArticleSchema
  .pre('findOne', autoPopulateComments)
  .pre('find', autoPopulateComments);

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;
