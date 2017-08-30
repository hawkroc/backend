
const schedule = require('node-schedule')
const config = require('../imports/config/config')
const synchronizeDataFromApi = require('./synchronizeData')

scheduleCronstyle : () => {
	schedule.scheduleJob(config.schedule, () => {
		console.log('schedule: Data sync job has started.')
		synchronizeDataFromApi()
	})
}
