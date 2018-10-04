const db = require('../models');

exports.commentDeletePost = (req, res) => {
  db.Comment.findByIdAndRemove({ _id: req.params.id }, (err, response) => {
    if (err) throw err;
    res.send(response);
  });
};
