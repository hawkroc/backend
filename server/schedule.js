import { Meteor } from 'meteor/meteor' 

const schedule = require('node-schedule')
const synData = require('./synchronizeData')


scheduleCronstyle = () => {
	schedule.scheduleJob(
		Meteor.settings.scheduling.transaction_miner_expression, 
		() => {
			console.log('schedule: Data sync job has started.')
			synchronizeDataFromApi()
		})
}
