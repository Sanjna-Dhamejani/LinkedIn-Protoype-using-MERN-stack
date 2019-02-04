var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')
var mongoose1 = require('mongoose');


function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for getting job details")
    console.log("\n\n User data is: ", msg.jobId)

    // Job.findById(msg.jobId)
    // .populate('postedBy')
    // .populate('applications')
    // .populate('jobSaved')
    // .exec()
    //     .then(result => {
    //         callback(null,result)

    //     })
    //     .catch(err => {
    //         callback(err,err)
    //     })





    // const jobId = msg.jobId
    const jobId = mongoose1.Types.ObjectId(msg.jobId)
    console.log("___________jobid_________", jobId, "\n_______________________type", typeof jobId)
   
    Job.findOneAndUpdate(
        { "_id": jobId },
        { $inc: { "noOfViews": 1 } }
    )
        .populate('postedBy')
        .populate('applications')
        .populate('jobSaved')
        .exec()
        .then(result => {
            console.log("____________result__________", result)
            callback(null, result)

        })
        .catch(err => {
            console.log("_____________err______________---")
            callback(err, err)
        })


}
exports.handle_request = handle_request;