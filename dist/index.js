'use strict';

var express = require('express');

var app = express();

app.get('/', function (req, resp) {
  console.log('pika');
});

var server = app.listen(5000, function () {
  return console.log('Starting server on port 5000');
});