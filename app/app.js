'use strict';

const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.locals.env = process.env['NODE_ENV'];

app.use(express.static('public'));
app.use(express.static('static'));

if ( process.env['NODE_ENV'] !== 'production' ){
  app.use(require('./middleware/webpack'))
}

module.exports = app;
