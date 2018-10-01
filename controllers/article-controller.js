const db = require('../models');

exports.commentCreatePost = (req, res) => {
  db.comments.create(req.body)
    .then((dbComment) => {
      console.log('DBCOMMENT', dbComment);
      return db.articles.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment._id } }, { new: true });
    })
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
};
