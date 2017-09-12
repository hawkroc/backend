import axios from 'axios'
import { Meteor } from 'meteor/meteor'
import ExchangeRate from '../imports/api/exchangeRates/exchangeRates'


const getExchangeRateFromLocal = () => {
	let exchangeRateList = ExchangeRate.find().map(a => ({
		_id: a._id,
		bitCoin: a.bitCoin,
		fiatCurrency: a.fiatCurrency,
		latestDate: a.latestDate,
		hisCurrency: a.hisCurrency
	}))
	return exchangeRateList
}


export const fetchExchangeRates = Meteor.bindEnvironment(() => {
	let exchangeRateList = getExchangeRateFromLocal()
	for (let currency of exchangeRateList) {
		let since = currency ? currency.latestDate : 0
		getHistoryExchange(
			currency.bitCoin,
			currency.fiatCurrency,
			since
		).then(response => {
			ExchangeRate.update(currency._id, {
				$push: {
					hisCurrency: {
						$each: response
					}
				}
			})

			ExchangeRate.update(currency._id, {
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

