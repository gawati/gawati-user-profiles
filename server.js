var express = require('express');
var bodyParser = require("body-parser");
const expressValidator = require('express-validator');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var path = require('path');

var serveStatic = require('serve-static')

const winston = require('winston');

winston.level = process.env.LOG_LEVEL || 'error' ;

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
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

app.use('/gwu/'+process.env.FILESYSTEM_UPLOAD_DIRECTORY, serveStatic(path.join(__dirname, process.env.FILESYSTEM_UPLOAD_DIRECTORY)))

const routes = require('./server/routes/index');

app.use('/gwu', routes);


const server = app.listen(process.env.PORT, () => {
  winston.log("info", `Server running on localhost:${server.address().port}`);
});