/* global Meteor, Session */
const schedule = require('node-schedule')
const config = require('../imports/config/config')
import { fetchCurrencies } from './fetchCurrencies'
import { synchronizeDataFromApi } from './synchronizeData'
const scheduleCronstyle = () => {
	schedule.scheduleJob(config.schedule, () => {
		console.log('schedule: Data sync job has started.')
		 synchronizeDataFromApi()
	})
}

const scheduleGetCurrencies = () => {
	schedule.scheduleJob(config.schedule, () => {
		console.log('schedule: Currencies job has started.')
		fetchCurrencies()
	})
}


export default {
	apply: () => {
		Meteor.startup(() => {
			scheduleCronstyle()
			scheduleGetCurrencies()
		})
	}
}

