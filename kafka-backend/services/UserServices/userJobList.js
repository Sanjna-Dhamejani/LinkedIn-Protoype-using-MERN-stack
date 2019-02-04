var mongoose1 = require('mongoose');

var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for fetching jobs of a particular user")
    console.log("\n\n User data is: ", msg)

    //const userId = mongoose1.Types.ObjectId(msg.userId)

    console.log(Job)
    Job.find({
        postedBy: msg.userId
    }).exec()
        .then(result => {
            // console.log("\nSending the result");
            callback(null,result)
        })
        .catch(err => {
            console.log("\nSome error occured");
            // console.log(err);
            callback(err, "Some error occured")
        })
}


exports.handle_request = handle_request;