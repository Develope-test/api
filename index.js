var FCM = require('fcm-push');
var schedule = require('node-schedule');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 9000;

const cors = require('cors');

app.use(cors());

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/test', function(req, res, next){
    res.send('Done');
    console.log('yes');
});

//sendNow Push Notification
app.post('/push-now', urlencodedParser, function(req, res) {
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

//SendLater Push Notification
app.post('/push', urlencodedParser, function (req, res) {
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
app.listen(PORT, () => console.log('Example app listening on port 9000!'));