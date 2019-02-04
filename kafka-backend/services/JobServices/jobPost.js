var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for posting job")
    console.log("\n\n User data is: ", msg)

    var required_skills_array = msg.required_skills.split(',');

    const newJob = new Job({
        postedBy: msg.postedBy,
        jobTitle: msg.jobTitle,
        description: msg.description,
        industry: msg.industry,
        employmentType: msg.employmentType,
        postedDate: msg.postedDate,
        location: msg.location,
        jobFunction: msg.jobFunction,
        required_skills: msg.required_skills,
        companyLogo : msg.companyLogo,
        companyName : msg.companyName,
        applyMethod : msg.applyMethod,


        noOfViews:0,
        noOfViews_submitted:0,
        noOfViews_applied:0

    })

  

    newJob.save()
        .then((jobResult, err) => {
            if (err) {
                console.log("____________err_____________",err)
                callback(err, err)
            } else {
                console.log("Job posted: ", jobResult)
                UserInfo.findByIdAndUpdate(msg.postedBy, {
                    $push: {
                        jobs_posted: jobResult._id
                    }
                }).exec()
                    .then(userResult => {
                        callback(null, jobResult)
                    })
                    .catch(err => {
                        callback(err,err)
                    })
            }
        })
        .catch(err => {
            callback(err, err)
        })
}


exports.handle_request = handle_request;