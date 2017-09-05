import { Meteor } from 'meteor/meteor' 

const schedule = require('node-schedule')

import { fetchCurrencies } from './fetchCurrencies'
import { synchronizeDataFromApi } from './synchronizeData'
const scheduleCronstyle = () => {
	schedule.scheduleJob(Meteor.settings.scheduling.transaction_miner_expression, () => {
		console.log('schedule: Data sync job has started.')
		 synchronizeDataFromApi()
	})
}

const scheduleGetCurrencies = () => {
	schedule.scheduleJob(Meteor.settings.scheduling.transaction_miner_expression, () => {
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

