import axios from 'axios'
import { Meteor } from 'meteor/meteor'
import ExchangeRate from '../imports/api/exchangeRates/exchangeRates'


const getExchangeRateFromLocal = () => {
	let exchangeRateList = ExchangeRate.find().map(a => ({
		_id: a._id,
		digitalCurrency: a.digitalCurrency,
		fiatCurrency: a.fiatCurrency,
		latestMinedDate: a.latestMinedDate,
		rates: a.rates
	}))
	return exchangeRateList
}


export const fetchExchangeRates = Meteor.bindEnvironment(() => {
	let exchangeRateList = getExchangeRateFromLocal()
	for (let currency of exchangeRateList) {
		let since = currency ? currency.latestMinedDate : 0
		fetchHistoricalExchangeRates(
			currency.digitalCurrency,
			currency.fiatCurrency,
			since
		).then(response => {
			ExchangeRate.update(currency._id, {
				$push: {
					rates: {
						$each: response
					}
				}
			})

			ExchangeRate.update(currency._id, {
				$set: {
					// TODO: should this be latest block from API call?
					latestMinedDate: response[0].time
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

const fetchHistoricalExchangeRates = (digitalCurrency, fiatCurrency, since) => {
	let final = 'https://apiv2.digitalCurrencyaverage.com/indices/global/history/'
		+ digitalCurrency + fiatCurrency + '?period=daily&?format=json'

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

