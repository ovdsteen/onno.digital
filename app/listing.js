'use strict';

var app = require('./app');
var config = require('./config');

app.listen(config.listen, function () {
  console.log('Example app listening on port ' + config.listen);
});

