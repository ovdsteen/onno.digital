'use strict';

var express = require('express');
var app = express();
var config = require('./config');

app.use(express.static('public'));
app.use(express.static('static'));

if ( process.env['NODE_ENV'] !== 'production' ){
  app.use(require('./middleware/webpack'))
}

module.exports = app;
