import { Meteor } from 'meteor/meteor'
import schedule  from 'node-schedule'
import { fetchExchangeRates } from './fetchExchangeRates'
import { synchronizeDataFromApi } from './synchronizeData'
const scheduleCronstyle = () => {
	schedule.scheduleJob(Meteor.settings.scheduling.transaction_miner_expression, () => {
		console.log('schedule: Data sync job has started.')
		 synchronizeDataFromApi()
	})
}

const scheduleGetCurrencies = () => {
	schedule.scheduleJob(Meteor.settings.scheduling.exchangerate_miner_expression, () => {
		console.log('schedule: Currencies job has started.')
		fetchExchangeRates()
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

