var express = require('express');
var app = express();

var port = 3002;

app.listen(port);
console.log("copy-to-s3 listening on port " + port + "...");
