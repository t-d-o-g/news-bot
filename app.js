const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

const request = require('request');
const cheerio = require('cheerio');

const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost/contentDB';
mongoose.Promise = Promise;
mongoose.connect(mongoDB, { useNewUrlParser: true });
const db = mongoose.connection;
/* eslint-disable no-console */
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
/* eslint-enable no-console */

const indexRouter = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
