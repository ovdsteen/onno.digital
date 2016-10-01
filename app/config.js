'use strict';

const fs = require('fs');
const file = process.cwd() + '/config.json';
let config;

try {
  config = fs.readFileSync(file, {encoding: 'utf8'});
  config = JSON.parse(config);
} catch(e){
  if (e.code == 'ENOENT'){
    console.error('Could not find config file %s', file);
  } else {
    console.error('Could not parse config file: %s', e.message);
  }
  process.exit(1);
}

module.exports = config;
