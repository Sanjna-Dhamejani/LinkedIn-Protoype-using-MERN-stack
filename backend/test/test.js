var chai = require('chai');
var chaiHttp = require('chai-http');
var should = require('chai').should();
// var request = require('request');
//import {ROOT_URL} from '../constants/constants';

var expect = chai.expect;

chai.use(chaiHttp);

it("Should check if Job Listing is being returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/job/list/5c06b8010732546084383d17')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})

it("Should check if Profile is being returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/user/5c06b8010732546084383d17')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})

it("Should check if Job Details are being returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/job/5c06bad51c24f657904f5dbe')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})

// it("Should check if login is being returned", function (done) {
//     chai.request('http://127.0.0.1:3001')
//         .post('/user')
//         .send({"fname":"Rachel","lname":"Greene","type":"S",
//         "email":"rachel@gmail.com","headline":"Student at SJSU",
//         "noOfViews":0,"country":"US","zipcode":"95112","current_position":"Student",
//         "current_company":"SJSU", "current_start":"01-01-2018",
//         "current_end":"05-01-2018", "education":"Masters", "profileImage":"defff.jpg"
//     })
//         .end(function (err, res) {
//             expect(res).to.have.status(200)
//             done();
//         });
        
// })

it("Should check if Saved Jobs are being returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/5c06cc5ebd11606730c7b645/savedJobs')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})

it("Should check if Applied Jobs are being returned", function (done) {
    chai.request('http://127.0.0.1:3001')
        .get('/5c06b8010732546084383d17/appliedJobs')
        .end(function (err, res) {
            should.not.exist(err)
            should.exist(res.body);
            done();
        });
})