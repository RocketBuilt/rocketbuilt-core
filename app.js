var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var logger = require('morgan');

app.use(logger('dev'));

app.use('/upload', require('./modules/upload'));

app.get('/', function (req, res) {
  res.send('Hello World');
});

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

app.listen(process.env.PORT || 3000);
