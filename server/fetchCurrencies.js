import axios from 'axios'

import { Meteor } from 'meteor/meteor'
import Currencies from '../imports/api/currency/currency'
export const fetchCurrencies = Meteor.wrapAsync(() => {
	let  currenciesList = getCurrenciesFromLocal()
	console.log('currenciesList' + JSON.stringify(currenciesList))
	getHistoryExchange('ETH', 'USD', null).then(response => {
		return response
	})
})

/**
 * get historyCurrency from api only if there new transactions  it be invoked
 * // 
 */

// only for development static data
const historyCurrencyUrl = 'http://127.0.0.1/fakeData/'
// "https://apiv2.bitcoinaverage.com/indices/global/history/";
const getHistoryExchange = (bitCoin, fiatCurrency, since) => {
	let final = historyCurrencyUrl + bitCoin + fiatCurrency + '.json'
	console.log('final ' + final)

	return axios
		.get(final)
		.then(res => {
			return res.data.filter(a => {
				return a.time > '2017-08-30 00:00:00'
			})
		})
		.catch(error => {
			throw error
		})
}

const getCurrenciesFromLocal = ()=>{
	let currenciesList = Currencies.find().map(a => ({
		_id: a._id,
	}))
	return currenciesList.fetch()
}
