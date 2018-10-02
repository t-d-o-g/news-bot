const request = require('request');
const cheerio = require('cheerio');

const db = require('../models');

exports.index = (req, res) => {
  request({
    url: 'https://businessinsider.com/', 
    jar: true
  }, (err, res, homepageHtml) => {
    let $ = cheerio.load(homepageHtml);

    $('.title').each((i, el) => {
      const result = {};
      const title = $(el).text();
      const link = $(el).attr('href');

      if (title && link) {
        result.title = title;
        result.link = link;
      }

      request({
        url: link, 
        jar: true
      }, (err, res, postHtml) => {
        $ = cheerio.load(postHtml);

        const description = $('meta[name=description]');
        result.summary = description.attr('content');

        db.Article.findOneAndUpdate(result, result, { upsert: true })
          .then((dbArticles) => {
            res.json(dbArticles);
            // console.log(dbArticles);
          })
          .catch(err => err);
      });
    });
  });

  db.Article
  // This returns data from objects 
    // .findById({_id: '5bb36ee2438636dba5fd4931'})
  // This returns objects 
    .find({})
    .sort({ _id: -1 })
    .limit(10)
    .populate('comments')
    .exec((err, docs) => {
      console.log(docs);
      if (err) throw err;
      const hbsObject = {
        title: 'News Bot',
        articles: docs,
      };
      res.render('index', hbsObject);
    });
};
