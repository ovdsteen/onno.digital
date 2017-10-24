'use strict';

const request = require('request');
const config = require('./config');
const app = require('./app');

let IOT = {
    percentage: 0
}

app.get('/api/iot/nodemcu', (req, res) => {
    res.json({ 
        percentage: IOT.percentage
    });
})
app.post('/api/iot/nodemcu', (req, res) => {
    IOT.percentage = req.body.percentage;
    res.json('done');
})

app.get('/*', function(req, res, next){
    var ajax = req.xhr;
    if (!ajax){
        res.render('index', { });
    }else{
        next();
    }
});
