import axios from 'axios'
import { Meteor } from 'meteor/meteor'
import Currencies from '../imports/api/currency/currency'

export const fetchExchangeRates = Meteor.bindEnvironment(() => {

	let currenciesList = Currencies.find().map(a => ({
		_id: a._id,
		bitCoin: a.bitCoin,
		fiatCurrency: a.fiatCurrency,
		latestDate: a.latestDate,
		hisCurrency: a.hisCurrency
	}))

	for (let currency of currenciesList) {
		let since = currency ? currency.latestDate : 0
		fetchHistoricalExchangeRates(
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

const fetchHistoricalExchangeRates = (bitCoin, fiatCurrency, since) => {
	let final = 'https://apiv2.bitcoinaverage.com/indices/global/history/' 
		+ bitCoin + fiatCurrency + '?period=daily&?format=json'

	console.log('Fetching historical exchange data:', final)

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

