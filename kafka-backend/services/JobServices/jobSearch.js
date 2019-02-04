var UserInfo = require('../../models/userInfo')
var Application = require('../../models/application')
var Job = require('../../models/job')
var Message = require('../../models/message')

function handle_request(msg, callback) {

    console.log("\n\nInside kafka backend for searching of job")
    console.log("\n\n User data is: ", msg)

    var splitted = msg.job_title.split(" ");
    var regex_str = "^(.*";
    for (let i = 0; i < splitted.length; i++) {
        regex_str = regex_str + splitted[i] + ".*";
    }
    regex_str = regex_str + ")$";


    Job.find({
        //   jobTitle : {$regex : regex_str}, 
        $or: [{ jobTitle: { $regex: regex_str, $options: 'i' } }, { required_skills: { $regex: regex_str, $options: 'i' } }],
        location: { $regex: msg.location, $options: 'i' }
    }).exec()
        .then((result, err) => {
            if (err) {
                callback(err, err)
            } else {
                //   console.log("Result obtained after the search query: \n",result)
                callback(null, result)
            }
        })
        .catch(err => {
            callback(err, err)
        })
}


exports.handle_request = handle_request;