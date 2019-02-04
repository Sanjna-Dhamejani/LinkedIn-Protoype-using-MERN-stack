var mongoose =require('mongoose');

var experience_schema = require('./experienceInfo').experience
var education_scheme = require('./educationInfo').education

 //var users= mongoose.model('Users',{

var users= mongoose.Schema({
    email : {
        type : String,
        required: true,
        unique:true
    },
    fname : {
        type : String,
        required: true
    },
    lname : {
        type : String,
        required: true     
    },
    type : {
        type : String,
        required: true
    },
    headline : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    },
    zipcode : {
        type : String
    },
    current_position:{
        type:String
    },
    current_company:{
        type:String
    },
    current_start:{
        type:String
    },
    current_end:{
        type:String
    },
    experience : [experience_schema],
    education : [education_scheme],
    skills : {
        type : Array
    },
    profile_summary : {
        type : String
    },
    resume : {
        type : String
    },
    profileImage:{
        type:String
    },
    jobs_applied : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    jobs_posted : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    jobs_saved : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job'
        }
    ],
    applications : [{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Application'
    }],
    connections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    pending_sent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    pending_receive:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }],
    conversations : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    }],
    noOfViews:{
        type:Number
    }  
})
 
users.pre('remove', { document: true }, function() {
    console.log('-----------------------------------Removing doc!');
  });
/*
users.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    console.log('------------------------------------------------Removing doc!');
    //this.model('Job').remove({ postedBy: this._id }, next);
    next();
    
}); */

//module.exports = {users};

module.exports = mongoose.model('Users',users);