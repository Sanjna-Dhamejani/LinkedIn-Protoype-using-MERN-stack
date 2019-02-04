var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for editing details of job")
    console.log("\n\n User data is: ", msg)
    console.log("\n\n User data is: ", msg.setJobId)

    Job.findByIdAndUpdate(msg.setJobId,
        {
            $set: {
                jobTitle: msg.job_title,
                description: msg.job_description,
                industry: msg.job_industry,
                employmentType: msg.employment_type,
                location: msg.job_location,
                jobFunction: msg.job_function,
                companyLogo: msg.company_logo,
                postedDate: msg.postedDate,
                required_skills: msg.required_skills,
                companyName : msg.companyName,
                applyMethod : msg.applyMethod,
            }
        }
    )
        .exec()
        .then((result, err) => {
            if (err) {
                console.log("__________err_________________",err)

                callback(err,err)
            } else {
                console.log("__________result_________________",result)
                callback(null,result)
            }
        })
        .catch(err => {
            console.log("__________err_________________",err)

            callback(err,err)
        })    
}



exports.handle_request = handle_request;