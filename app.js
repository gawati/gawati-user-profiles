var express = require('express');
var bodyParser = require("body-parser");
const expressValidator = require('express-validator');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var path = require('path');

var serveStatic = require('serve-static')

const winston = require('winston');
const pathUtils = require('./server/utils/pathUtils');

winston.level = process.env.LOG_LEVEL || 'error' ;

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE)
  .then( (val) => {
    console.log(" Connected to MongoDB");
  })
  .catch( (err) => {
    console.log(" Failed to connect to MongoDB; Aborting");
    process.exit(1);
  });
var db = mongoose.connection;

db.on('error', function() {
  winston.log("info", "database connection error");
});

db.once('open', function() {
  winston.log("info", `connected to database::${process.env.DATABASE}`);
});

require('./server/models/User');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(expressValidator());

app.use('/gwu/'+ process.env.FILESYSTEM_UPLOAD_DIRECTORY, serveStatic(pathUtils.uploadPath()))

const routes = require('./server/routes/index');

app.use('/gwu', routes);

module.exports = app;