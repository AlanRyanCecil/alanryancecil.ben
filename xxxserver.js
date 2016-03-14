'use strict';

var express = require('express');
var svgMesh3d = require('./node_modules/svg-mesh-3d/index.js');
var app = express();
var path = (__dirname + '/client').normalize();
var port = 8000;

app.use(express.static(path));
app.listen(port);

console.log('alandotApp running on port: ' + port + '   NODEMON. ');