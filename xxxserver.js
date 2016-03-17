'use strict';

var express = require('express');
var app = express();
var path = (__dirname + '/client').normalize();
var port = 8000;

app.use(express.static(path));
app.listen(port);

console.log('alandotApp running on port: ' + port + '   NODEMON farts. ');