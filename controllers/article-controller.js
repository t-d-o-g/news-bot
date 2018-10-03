const db = require('../models');

exports.commentCreatePost = (req, res) => {
  db.Comment.create(req.body)
    .then(dbComment => db.Article.findOneAndUpdate({ _id: req.params.id },
      { $push: { comments: dbComment } },
      { new: true }))
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.commentGet = (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate('comments')
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
};
