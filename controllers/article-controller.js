const request = require('request');
const cheerio = require('cheerio');

const db = require('../models');

exports.index = (req, res) => {
  res.render('index', { title: 'Express' });

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

      db.articles.create(result)
        .then(dbArticle => {
          console.log(dbArticle);
        })
        .catch(err => {
          return res.json(err);
        });
    });
  });







  // db.articles.find({}, (err, data) => {
  //   if (err) throw err;
  //   res.json(data);
  // });
}