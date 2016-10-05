'use strict';

const request = require('request');
const config = require('./config');
const app = require('./app');

app.get('/*', function(req, res, next){
    var ajax = req.xhr;
    if (!ajax){
        res.render('index', { });
    }else{
        next();
    }
});
