var express = require('express');
var router = express.Router();

var FCM = require('fcm-push');
var schedule = require('node-schedule');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/push-now', function(req, res, next) {
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

router.post('/push', function (req, res, next) {
  var timestamp=new Date().getTime();
  console.log('Working');
  console.log('Body: ', req.body);

let title = req.body.title;
let regID = req.body.Ids;
let idNew = JSON.parse(regID);

let msg = req.body.msg;
let url = req.body.url;

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


var ho = req.body.ho;
var mi = req.body.mi;
let yr = req.body.yr;
let mon = req.body.mon;
let day = req.body.day;
// var da = req.body.da;
console.log('Hours: ',ho);
console.log('Minute: ',mi);
console.log('Year: ',yr);
console.log('Month: ',mon);
console.log('Date: ',day);

var serverkey = req.body.serverKey;  
var fcm = new FCM(serverkey);

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
  }
});
});


});

module.exports = router;
