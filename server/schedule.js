// import { Records } from '../imports/api/records.js'; import {Settings} from
// '../imports/api/settings.js';
import Accounts from '../imports/api/accounts/accounts';
import {Meteor} from 'meteor/meteor';
const schedule = require('node-schedule');
const synData = require('./synchronizeData');
const config = require('../imports/config/config');

scheduleCronstyle = () => {
    schedule.scheduleJob(config.schedule, () => {
      console.log("shedule job started");
      SynchronizeDataFromApi();

    });
}