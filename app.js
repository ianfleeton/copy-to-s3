var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var http = require('http');

var app = express();

app.use(bodyParser.json());

var port = 3002;

app.post('/', function(req, res) {
  console.log("Received request to copy " + req.body.source);

  var parsedUrl = url.parse(req.body.source);
  console.log(parsedUrl);
  var sourceReq = http.get(parsedUrl, function(sourceRes) {
    console.log('STATUS: ' + sourceRes.statusCode);
    sourceRes.on('data', function(chunk) {
      console.log('BODY: ' + chunk);
    });
    res.send(sourceRes.statusCode);
  });
  sourceReq.on('error', function(err) {
    console.log(err);
    res.send(500);
  });
});

app.listen(port);
console.log("copy-to-s3 listening on port " + port + "...");
