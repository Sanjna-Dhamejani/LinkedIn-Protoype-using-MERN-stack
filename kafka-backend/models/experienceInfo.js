var mongoose =require('mongoose');

var experience= mongoose.Schema({
    title : {
        type : String
    },
    company : {
        type : String
    },
    industry : {
        type : String
    },
    description : {
        type : String
    },
    work_startDate : {
        type : String
    },
    work_endDate : {
        type : String
    }
})

module.exports = {experience};