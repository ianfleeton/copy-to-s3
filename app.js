var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var port = 3002;

app.post('/', function(req, res) {
  console.log("Received request to copy " + req.body.source);
  res.send(200);
});

app.listen(port);
console.log("copy-to-s3 listening on port " + port + "...");
