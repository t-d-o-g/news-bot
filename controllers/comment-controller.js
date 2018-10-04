const db = require('../models');

exports.commentDelete = (req, res) => {
  db.Comment.findByIdAndRemove({ _id: req.params.id }, (err, response) => {
    if (err) throw err;
    res.send(response);
  });
};
