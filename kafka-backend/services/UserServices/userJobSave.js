var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for saving a job")
    console.log("\n\n User data is: ", msg)

    Job.find({
        _id: msg.jobId,
        jobSaved: msg.userId
    }).exec()
        .then(checkResult => {
            console.log("length of result: ", checkResult.length)
            if (checkResult.length == 0) {
                Job.findByIdAndUpdate(msg.jobId, {
                    $push: {
                        jobSaved: msg.userId
                    }
                }).exec()
                    .then(jobResult => {
                        console.log("____________jobresult__________",jobResult)
                        UserInfo.findByIdAndUpdate(msg.userId, {
                            $push: {
                                jobs_saved: msg.jobId
                            }
                        }).exec()
                            .then(userResult => {
                                console.log("____________userResult_____________",userResult)
                                callback(null, "Successfull saved a job")
                            })
                            .catch(err => {
                                console.log("_____________err___________________",err)
                                callback(err, err)
                            })
                    })
                    .catch(err => {
                        console.log("~~~~~~~~~~~err~~~~~~~~~~~~~~~~~",err)
                        callback(err, err)
                    })
            } else {
                callback(null, "Already saved a job")
            }
        })
        .catch(err => {
            callback(err, err)
        })

}


exports.handle_request = handle_request;