//Constants for database
const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;
mongoose.Promise = global.Promise;
module.exports = mongoose.connect('mongodb://127.0.0.1:27017/mail');
