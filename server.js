const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var fs = require('fs');
var path = require('path');

require('dotenv').config({ path: 'variables.env' });

mongoose.connect(process.env.DATABASE);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'database connection error:'));

db.once('open', function() {
  console.log('connected to database:', process.env.DATABASE);
});

require('./server/models/User');

const app = require('./server/app');


const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on localhost:${server.address().port}`);
});