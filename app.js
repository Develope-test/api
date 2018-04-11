var createError = require('http-errors');
var express = require('express');

var FCM = require('fcm-push');
var schedule = require('node-schedule');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// const cors = require('cors');
// app.use(cors());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://walinns-test.unaux.com');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/push', function (req, res, next) {
  var timestamp=new Date().getTime();
  console.log('Working');
  console.log('Body: ', req.body);

let title = req.body.title;
let regID = req.body.Ids;
let idNew = JSON.parse(regID);

let msg = req.body.msg;
let url = req.body.url;
var ho = req.body.ho;
var mi = req.body.mi;
let yr = req.body.yr;
let mon = req.body.mon;
let day = req.body.day;

var serverkey = req.body.serverKey;  
var fcm = new FCM(serverkey);

  var message = {  
      registration_ids : idNew,
      Notification : {
          title : title,
          body : msg
      },
      data: {
          title: title,
          is_background: false,
          message: msg,
          image: url,
          timestamp: timestamp
      }    
  };


// var da = req.body.da;
console.log('Hours: ',ho);
console.log('Minute: ',mi);
console.log('Year: ',yr);
console.log('Month: ',mon);
console.log('Date: ',day);
 
//specified date
// var date = new Date(2018, 03, 07, ho, mi, 0);
let date = new Date(yr, mon, day, ho, mi, 0);

// var j = schedule.scheduleJob({hour: ho, minute: mi, dayOfWeek: da}, function(){
  var j = schedule.scheduleJob(date, function(){    
  console.log('Two ');
  fcm.send(message, function(err,response){  
  if(err) {
      console.log("Something has gone wrong !");
      console.log(err);
  } else {
      console.log("Successfully sent with resposne Two :",response);
      console.log('Data: ', message);
      res.send('Done');
  }
});
});
});

app.post('/pushNow', function(req, res, next) {
  console.log('Came');
  var timestamp=new Date().getTime();
  let regID = req.body.Ids;
  let idNew = JSON.parse(regID);
  let title = req.body.title;
  let msg = req.body.msg;
  let url = req.body.url;
  console.log('ID', regID);
  console.log('Title: ', title);
  console.log('Msg: ', msg);
  console.log('Url: ', url);

  var serverkey = req.body.serverKey;  
  var fcm = new FCM(serverkey);

  var message = {  
      registration_ids : idNew,
      Notification : {
          title : title,
          body : msg
      },
      data: {
          title: title,
          is_background: false,
          message: msg,
          image: url,
          timestamp: timestamp
      }    
  };

  console.log('Message: ',message);
  fcm.send(message, function(err,response){  
      if(err) {
          console.log("Something has gone wrong !");
          console.log(err);
      } else {
          console.log("Successfully sent with resposne Two :",response);
          console.log('Data: ', message);
          // res.send(JSON.stringify(response));
          res.send('Done');
      }
  });

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
