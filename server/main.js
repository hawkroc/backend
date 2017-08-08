// import { Meteor } from 'meteor/meteor';
// import '../imports/api/tasks.js';
const schedule = require('./schedule');
//export MONGO_URL="mongodb://localhost:27017/test";
Meteor.startup(() => {
  // code to run on server at startup
 // console.log("this is server start");
 scheduleCronstyle();
});
