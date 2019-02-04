var mongoose =require('mongoose');

var education= mongoose.Schema({
    college_name : {
        type : String
    },
    start_date : {
        type : String
    },
    end_date : {
        type : String
    },
    degree : {
        type : String
    },
    feild_of_study : {
        type : String
    },
    description : {
        type : String
    }
})

module.exports = {education};