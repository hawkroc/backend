import { Mongo } from 'meteor/mongo'
import { initializeFactory } from './exchangeRateFactory'

class ExchangeRatesCollection extends Mongo.Collection {
	insert(currency, callback) {
		return super.insert(currency, callback)
	}

	remove(selector, callback) {
		return super.remove(selector, callback)
	}
}

const ExchangeRates = new ExchangeRatesCollection('exchangeRates')

ExchangeRates.deny({
	insert() { return true },
	remove() { return true }
})

// Fields of the collection items that are made available to the client.
ExchangeRates.publicFields = {
	bitCoin: 1,
	fiatCurrency: 1,
	latestDate: 1,
	hisCurrency: 1
}


ExchangeRates.active = () => {
	let exchangeRatesList = ExchangeRates.find({}).map(a => ({
		_id: a._id,
		bitCoin: a.bitCoin,
		fiatCurrency: a.fiatCurrency,
		latestDate: a.latestDate,
		hisCurrency: a.hisCurrency
	}))

	return exchangeRatesList
}
// Attach helpers to the collection object.
ExchangeRates.helpers({

})

initializeFactory(ExchangeRates)

export default ExchangeRates
