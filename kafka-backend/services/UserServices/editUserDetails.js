var UserInfo = require('../../models/userInfo')//.users
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

  console.log("\n\nInside kafka backend for updating user details")
  console.log("\n\n User data is: ", msg)

  UserInfo.findByIdAndUpdate(msg.userId,
    {
      $set: {
        fname: msg.fname,
        lname: msg.lname,
        headline: msg.headline,
        current_position: msg.current_position,
        state: msg.state,
        country: msg.country,
        zip: msg.zip,
        profile_summary: msg.profile_summary,
      }
    },
    { upsert: true })
    .exec()
    .then(result => {
      callback(null, result)
    })
    .catch(err => {
      callback(err, err)
    })
}


exports.handle_request = handle_request;