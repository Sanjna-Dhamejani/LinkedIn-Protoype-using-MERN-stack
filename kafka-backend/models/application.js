var mongoose =require('mongoose');

var application= mongoose.Schema({
    applicant : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    job:[{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'Job'
    }],
    howDidYouHear:{
        type:String
    },
    isDisabled : {
        type:Boolean
    },
    resume : {
        type:String
    },
    ethnicity:{
        type:String
    },
    sponsership:{
        type:String
    }
})

module.exports = mongoose.model('Application',application)
