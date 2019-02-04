var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');

var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var Job = require('./models/job')
var logger = require('morgan');
var cors = require('cors')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var fileUpload = require('express-fileupload');
var jobsRouter = require('./routes/jobs');
var messageRouter = require('./routes/message')
var connectionRouter = require('./routes/connections')
var mongo = require('./connections/mongo');
var mongoose = require('mongoose');
const multer = require('multer')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret: 'cmpe273_homeaway',
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(bodyParser.json());
//Allow Access Control
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

mongoose.connect(mongo.url, {
  poolSize: mongo.pool
})
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err))

  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
  app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    httponly            : false,
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
  }));
  app.use(bodyParser.json());

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(fileUpload())

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/job', jobsRouter)
app.use('/message',messageRouter)
app.use('/connection',connectionRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, './uploads');
    },
    filename: (req, file, cb) => {
    
    const newFilename = `${file.originalname}`;
    cb(null,  newFilename);
    },
});

    const upload = multer({ storage });
    
    app.post('/companylogo', upload.single('selectedFile'), (req, res) => {
      //console.log("Req : ",req);
      //console.log("Res : ",res.file);
      console.log("Printing filename",res.req.file.filename)
      photostore=res.req.file.filename
      console.log("Inside photos Post for company logo");
      })

app.post('/download/:file(*)',(req, res) => {
  console.log("Inside download file");
  var file = req.params.file;
  var fileLocation = path.join(__dirname + '/uploads',file);
  var img = fs.readFileSync(fileLocation);
  var base64img = new Buffer(img).toString('base64');
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(base64img);
});

module.exports = app;
