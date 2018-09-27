const request = require('request');
const cheerio = require('cheerio');

const db = require('../models');

exports.index = (req, res) => {
  request('https://businessinsider.com/', (err, res, homepageHtml) => {
    let $ = cheerio.load(homepageHtml);

    $('.title').each((i, el) => {
      const result = {};
      const title = $(el).text();
      const link = $(el).attr('href');

      if (title && link) {
        result.title = title;
        result.link = link;
      }

      request(link, (err, res, postHtml) => {
        $ = cheerio.load(postHtml);

        const description = $('meta[name=description]');
        result.summary = description.attr('content');

        db.articles.findOneAndUpdate(result, result, { upsert: true })
          .then((dbArticles) => {
            console.log(dbArticles);
          })
          .catch(err => err);
      });
    });
  });

  db.articles
    .find({})
    .sort({ _id: -1 })
    .limit(10)
    .exec((err, docs) => {
      if (err) throw err;
      const hbsObject = {
        title: 'News Bot',
        articles: docs,
      };
      res.render('index', hbsObject);
    });
};
