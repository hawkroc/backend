import axios from 'axios'
import { Meteor } from 'meteor/meteor'
import Currencies from '../imports/api/currency/currency'


const getCurrenciesFromLocal = () => {
	let currenciesList = Currencies.find().map(a => ({
		_id: a._id,
		bitCoin: a.bitCoin,
		fiatCurrency: a.fiatCurrency,
		latestDate: a.latestDate,
		hisCurrency: a.hisCurrency
	}))
	return currenciesList
}


export const fetchCurrencies = Meteor.bindEnvironment(() => {
	let currenciesList = getCurrenciesFromLocal()
	for (let currency of currenciesList) {
		let since = currency ? currency.latestDate : 0
		getHistoryExchange(
			currency.bitCoin,
			currency.fiatCurrency,
			since
		).then(response => {
			Currencies.update(currency._id, {
				$push: {
					hisCurrency: {
						$each: response
					}
				}
			})

			Currencies.update(currency._id, {
				$set: {
					// TODO: should this be latest block from API call?
					latestDate: response[0].time
				}
			})

			return response
		})
	}
})

/**
 * get historyCurrency from api only if there new transactions  it be invoked
 * 
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
			return res.data
				.map(t => {
					t.time = Date.parse(new Date(t.time))
					return t
				})
				.filter(a => {
					return a.time > since
				})
		})
		.catch(error => {
			throw error
		})
}

