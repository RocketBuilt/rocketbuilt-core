var helpers = require('../../helpers');
var express = require('express');
var router = express.Router();
var zlib = require('zlib');
var AWS = require('aws-sdk');

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;

AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
});

router.use(function(req, res, next) {
  res.append('access-control-allow-origin', '*');
  res.append('access-control-allow-headers', 'content-type, x-file-date, x-file-name, x-file-size, x-file-type, x-requested-with');
  next();
});

router.post('/', function(req, res, next) {
  
  var fileName = req.get('x-file-name');

  var s3obj = new AWS.S3({params: {Bucket: S3_BUCKET, Key: fileName}});

  s3obj.upload({Body: req})
    .on('httpUploadProgress', function(evt) { console.log(evt); })
    .send(function(err, data) {
      if (err) {
        next(err);
        return;
      }

      res.status(202).end();
      next();
    });
});

module.exports = router;
