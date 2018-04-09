var FCM = require('fcm-push');
// var moment = require('moment');
// var serverkey = 'AAAAMdo8PY4:APA91bF8tys_Br5L5-tFaGmtsCSA4Xm4lFqz8LDhaqSdxdcg9pRB9KOV0tczGvY6NsDLYs8qms5JEDFWx33KWvEp7q5bZEJRWEiDDEfsMeCAhlL-v5gXhIWf2D92qMPUoS2ZqaBFfKiO';  
var serverkey = 'AAAAMdo8PY4:APA91bF8tys_Br5L5-tFaGmtsCSA4Xm4lFqz8LDhaqSdxdcg9pRB9KOV0tczGvY6NsDLYs8qms5JEDFWx33KWvEp7q5bZEJRWEiDDEfsMeCAhlL-v5gXhIWf2D92qMPUoS2ZqaBFfKiO';
var fcm = new FCM(serverkey);
var timestamp=new Date().getTime();
var message = {  

    to : 'ewjYzwo2TIg:APA91bHxIOzQXoBiBvZcZUNgXIpGRbTQsqLaRVNZZG92Ie9O4eTZsLcvYdGYoj2TZ8HuCvqoyQiH3yPMssPUZsZg-TtTv2ThpXEuqryw3nKwlvgBkYzGldgyQKciqaOu2WlbZpdgSYsS',

    Notification : {
        title : 'Surya',
        body : 'Body of the notification'
    },
    data: {
        title: 'Surya',
        is_background: false,
        message: 'Message',
        image: 'https://pbs.twimg.com/profile_images/972154872261853184/RnOg6UyU_400x400.jpg',
        timestamp: timestamp
    }    
};
// {
// "to": "ewjYzwo2TIg:APA91bHxIOzQXoBiBvZcZUNgXIpGRbTQsqLaRVNZZG92Ie9O4eTZsLcvYdGYoj2TZ8HuCvqoyQiH3yPMssPUZsZg-TtTv2ThpXEuqryw3nKwlvgBkYzGldgyQKciqaOu2WlbZpdgSYsS",
//    "Notification":{
//         "title":"hghgh",
//         "message":"ghghgh"
//    },
   
//   "data":{  
//      "title":"dgfdgfdh",
//      "is_background":false,
//      "message":"Message",
//      "image":"https:\/\/walinns.com\/wp-content\/uploads\/2018\/02\/icons8-realtime-64-1.png",
//       "timestamp":"2018-03-29 4:37:56"
//   }
// }
fcm.send(message, function(err,response){  
    if(err) {
        console.log("Something has gone wrong !");
    } else {
        console.log("Successfully sent with resposne :",response);
        console.log('Data: ', message);
    }
});