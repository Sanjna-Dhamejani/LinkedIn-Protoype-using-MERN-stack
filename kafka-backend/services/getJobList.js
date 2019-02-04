var { mongoose } = require('../db/mongoose');
// var { userinfos } = require('../models/userinfos');
var Job = require('../models/job')
var bcrypt = require('bcryptjs');

function handle_request(msg, callback) {

  console.log("\n\nInside kafka backend for getting jobs request")
  Job.find({
    postedBy: msg.userID
  })
    .exec()
    .then(result => {
      console.log("Result fetched ", result)
      callback(null, result)
    })
    .catch(err => {
      callback(err, err)
    })
}


exports.handle_request = handle_request;
