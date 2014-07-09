var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var http = require('http');
var Uploader = require('s3-streaming-upload').Uploader;

var app = express();

app.use(bodyParser.json());

var port = process.env.COPY_TO_S3_PORT;

app.post('/', function(req, res) {
  console.log("Received request to copy " + req.body.source);

  var parsedUrl = url.parse(req.body.source);
  console.log(parsedUrl);
  var sourceReq = http.get(parsedUrl, function(sourceRes) {
    console.log('Fetch STATUS: ' + sourceRes.statusCode);

    if(sourceRes.statusCode == 200) {
      var objectName = parsedUrl.hostname + parsedUrl.pathname;

      var upload = new Uploader({
        accessKey:  process.env.COPY_TO_S3_AWS_API_KEY,
        secretKey:  process.env.COPY_TO_S3_AWS_SECRET,
        bucket:     process.env.COPY_TO_S3_AWS_BUCKET,
        objectName: objectName,
        stream:     sourceRes,
        objectParams: {
          ACL: 'public-read'
        }
      });

      upload.on('completed', function (err, s3Res) {
        console.log('upload completed');
        res.send(200);
      });

      upload.on('failed', function (err) {
        console.log('upload failed with error', err);
        upload.finishUploads();
        if(!res.headersSent) {
          res.send(500);
        }
      });
    } else {
      res.send(sourceRes.statusCode);      
    }
  });
  sourceReq.on('error', function(err) {
    console.log(err);
    res.send(500);
  });
});

app.listen(port);
console.log("copy-to-s3 listening on port " + port + "...");
