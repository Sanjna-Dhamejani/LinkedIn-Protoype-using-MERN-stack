var { mongoose } = require('../db/mongoose');
var { userinfos } = require('../models/userinfos');

var bcrypt = require('bcryptjs');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for login request")

}


exports.handle_request = handle_request;