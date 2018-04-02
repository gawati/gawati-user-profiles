var path = require('path');
var express = require('express');
var bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const fileUpload = require('express-fileupload');

var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));

app.use(expressValidator());
//app.use(fileUpload());

const routes = require('./routes/index');

app.use('/', routes);

module.exports = app;