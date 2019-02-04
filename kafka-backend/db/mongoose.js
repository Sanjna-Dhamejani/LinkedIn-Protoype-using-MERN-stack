var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://admin:admin123@ds231723.mlab.com:31723/linkedin');

module.exports = {mongoose};