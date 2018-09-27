const request = require('request');
const cheerio = require('cheerio');

const db = require('../models');

exports.index = (req, res) => {
  // res.render('index', { title: 'News Bot' });

  request('https://businessinsider.com/', (err, res, data) => {
    let $ = cheerio.load(data);

    $('.title').each((i, el) => {
      const result = {};
      let title = $(el).text();
      let link = $(el).attr('href');

      if (title && link) {
        result.title = title;
        result.link = link; 
      }

      db.articles.findOneAndUpdate(result, result, {upsert: true})
        .then(dbArticles => {
          // console.log(dbArticles);
        })
        .catch(err => {
          return err;
        });
    });
  });
  db.articles.find({}, (err, docs) => {
    if (err) throw err;
    console.log('length', docs.length);

    const hbsObject = {
      articles: docs 
    }
    // return hbsObject;
    res.render('index', hbsObject);
  });
}
