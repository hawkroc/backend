import { Records } from '../imports/api/records.js';
import {Settings} from '../imports/api/settings.js';
import { Meteor } from 'meteor/meteor';
const schedule = require('node-schedule');
const synData = require('./synchronizeData');

//const address = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
const config = require('../imports/config/config');


scheduleCronstyle = () => {
    //let start, end;
    schedule.scheduleJob(config.schedule, () => {
        GetCurrentBlock().then((response) => {
            let end = response.data.result;
            let start = Meteor.call('records.getMaxBlock',config.address);
            console.log('this is start  '+start+"this is end "+end);
            GetdataFromApi(start, end, config.address).then((response) => {
          // Meteor.call('records.remove');
       Meteor.call('records.batchInsert', response.data.result,config.address);
         // console.log('this saved is '+temp.length);
     
        //    console.log('this is move on'+JSON.stringify( Meteor.call('records.getCount')));
         //   let t =Meteor.call('records.searchRecords',  4109947, 4114377,config.address);
         // console.log(JSON.stringify(t));
         // 
         //console.log(Meteor.call('settings.findByUserId',123));
            });
        });

    });
}