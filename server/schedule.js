
const schedule = require('node-schedule')
const synData = require('./synchronizeData')
const config = require('../imports/config/config')

scheduleCronstyle = () => {
	schedule.scheduleJob(config.schedule, () => {
		console.log('schedule: Data sync job has started.')
		synchronizeDataFromApi()
	})
}
