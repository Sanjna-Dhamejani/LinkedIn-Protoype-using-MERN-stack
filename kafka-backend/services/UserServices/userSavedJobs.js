var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for fetching saved jobs")
    console.log("\n\n User data is: ", msg)

    Job.find({
        jobSaved : msg.userId
    })
    .populate('postedBy')
    .exec()
        .then(result => {
            console.log("Result is: ",result)
            callback(null,result)
        })
        .catch(err => {
            callback(err,err)
        })

}


exports.handle_request = handle_request;