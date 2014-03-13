var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

// all environments
app.use(express.bodyParser());
app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.send('index.html');
});

http.createServer(app).listen(3000);