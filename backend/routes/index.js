var express = require('express');
var router = express.Router();
var multer = require('multer')
var mongoose = require('mongoose');
var UserInfo = require('../models/userInfo')
var path = require('path');
var Job = require('../models/job')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});




const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const newFilename = `${file.originalname}`
    console.log("company logo filename", newFilename)
    cb(null, newFilename);
  },
});

const upload = multer({
  storage
});

// router.post(':jobId/companylogo', upload.single('selectedFile'), (req, res) => {
//   //console.log("Req : ",req);
//   //console.log("Res : ",res.file);
//   console.log("Printing filename", res.req.file.filename)
//   photostore = res.req.file.filename
//   console.log("Inside photos Post for company logo");
// })


// router.post('/:userId/profilepic', upload.single('selectedFile'), (req, res) => {
//   //console.log("Req : ",req);
//   //console.log("Res : ",res.file);
//   console.log("Printing filename", res.req.file.filename)
//   photostore = res.req.file.filename
//   console.log("Inside photos profilepic user :", req.params.userId);

//   UserInfo.update(
//     { _id: req.params.userId },
//     {
//       $set:
//       {
//         profileImage: photostore
//       }
//     }
//   ).then((user) => {
//     console.log("User updated:", user);
//     res.sendStatus(200).end();

//   }, (err) => {
//     console.log("Error updating User.");
//     res.sendStatus(400).end();
//   })
// })

router.post('/:jobId/companylogo', async function (req, res, next) {
  console.log("trying to upload a file");
  let imageFile = req.files.selectedFile
  console.log(imageFile.name);

  imageFile.mv(`./public/uploads/jobLogo-${req.params.jobId}${path.extname(imageFile.name)}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    } else {
      Job.findByIdAndUpdate(req.params.jobId,{
        $set:{
          companyLogo : `uploads/jobLogo-${req.params.jobId}${path.extname(imageFile.name)}`
        }
      }).exec()
        .then(result => {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          const data = {
            "status":1,
            "msg":"Uploaded",
            "info":{
              "path":`uploads/jobLogo-${req.params.jobId}${path.extname(imageFile.name)}`
            }
          }
          console.log(`uploads/jobLogo-${req.params.jobId}${path.extname(imageFile.name)}`)
          res.end(JSON.stringify(data))
        })
        .catch(err => {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.end(err)
        })
    }
  })
})

router.post('/:userId/upload', async function (req, res, next) {
  console.log("trying to upload a file");
  let imageFile = req.files.selectedFile
  console.log(imageFile.name);

  imageFile.mv(`./public/uploads/userprofile-${req.params.userId}${path.extname(imageFile.name)}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    } else {
      UserInfo.findByIdAndUpdate(req.params.userId,{
        $set:{
          profileImage : `uploads/userprofile-${req.params.userId}${path.extname(imageFile.name)}`
        }
      }).exec()
        .then(result => {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          const data = {
            "status":1,
            "msg":"Uploaded",
            "info":{
              "path":`uploads/userprofile-${req.params.userId}${path.extname(imageFile.name)}`
            }
          }
          console.log(`uploads/userprofile-${req.params.userId}${path.extname(imageFile.name)}`)
          res.end(JSON.stringify(data))
        })
        .catch(err => {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.end(err)
        })
    }
  })
})


router.post('/:userId/resumeUpload', async function (req, res, next) {
  console.log("trying to upload a file", req.files);
  let imageFile = req.files.selectedFile
  console.log(imageFile.name);

  imageFile.mv(`./public/uploads/userresume-${req.params.userId}${path.extname(imageFile.name)}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    } else {
      UserInfo.findByIdAndUpdate(req.params.userId,{
        $set:{
          resume : `uploads/userresume-${req.params.userId}${path.extname(imageFile.name)}`
        }
      }).exec()
        .then(result => {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          const data = {
            "status":1,
            "msg":"Uploaded",
            "info":{
              "path":`uploads/userresume-${req.params.userId}${path.extname(imageFile.name)}`
            }
          }
          console.log(`uploads/userresume-${req.params.userId}${path.extname(imageFile.name)}`)
          res.end(JSON.stringify(data))
        })
        .catch(err => {
          res.writeHead(400, {
            'Content-Type': 'text/plain'
          });
          res.end(err)
        })
    }
  })
})

// router.post('/download/:file(*)', (req, res) => {
//   console.log("Inside download file");
//   var file = req.params.file;
//   var fileLocation = path.join(__dirname + '/uploads', file);
//   var img = fs.readFileSync(fileLocation);
//   var base64img = new Buffer(img).toString('base64');
//   res.writeHead(200, {
//     'Content-Type': 'image/jpg'
//   });
//   res.end(base64img);
// });




module.exports = router;
