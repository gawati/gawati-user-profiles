const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');


const userSchema = new mongoose.Schema({
  userName:{
    type: String,
    required: 'Please supply a username.',
    trim: true
  },
  dpUrl: String,
  nickName: String,
});


userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
