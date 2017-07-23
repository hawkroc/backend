
'use strict';

//const mongoose = require('mongoose');
const mongoose = require('../server/db.js'),
      Schema = mongoose.Schema;

const SettingSchema = new Schema({
  alias:[{name:String,address:String}],
  labels:[{name:String,isGST:Boolean}]
});
module.exports = mongoose.model('Setting', SettingSchema);
