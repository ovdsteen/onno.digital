'use strict';

var express = require('express');
var app = express();
var config = require('./config');

app
  .use(require('./middleware/webpack'))
  .use(express.static('public'))
  .use(express.static('src/views'));

module.exports = app;
