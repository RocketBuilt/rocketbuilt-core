var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var logger = require('morgan');
var mustacheExpress = require('mustache-express');
var swig = require('swig');

app.use(logger('dev'));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.set('view cache', false);
swig.setDefaults({cache: false});

app.set('views', __dirname + '/templates');

app.use(express.static('static'));

app.use('/upload', require('./modules/upload'));

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.use('/example', express.static('example'));

app.get('/edit/:id', function(req, res) {
  res.render('wrapper', {
    link: req.params.id
  });
});

// error handling middleware should be loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());

  var config = require('./webpack.config');
  var webpack = require('webpack');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, config.devServer));
  app.use(require('webpack-hot-middleware')(compiler));
}

app.listen(process.env.PORT || 3000);
