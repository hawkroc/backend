
'use strict';

//const mongoose = require('mongoose');
const mongoose = require('../server/db.js'),
      Schema = mongoose.Schema;

const SettingSchema = new Schema({
  id:String,
  alias:[{name:String,address:String}],
  labels:[{name:String,GST:Boolean}]
});
module.exports = mongoose.model('Setting', SettingSchema);
