import { Mongo } from 'meteor/mongo'
import { initializeFactory } from './exchangeRateFactory'
import ExchangeRateSchema from './schemas/exchangeRateSchema'

class ExchangeRatesCollection extends Mongo.Collection {
	insert(exchangeRate, callback) {
		return super.insert(exchangeRate, callback)
	}

	remove(selector, callback) {
		return super.remove(selector, callback)
	}
}

const ExchangeRates = new ExchangeRatesCollection('exchangeRates')
ExchangeRates.attachSchema(ExchangeRateSchema)
ExchangeRates.deny({
	update() { return true },
	insert() { return true },
	remove() { return true }
})

// Fields of the collection items that are made available to the client.
ExchangeRates.publicFields = {
	digitalCurrency: 1,
	fiatCurrency: 1,
	latestMinedDate: 1,
	rates: 1
}


ExchangeRates.active = () => {
	let exchangeRatesList = ExchangeRates.find({ }).map(a => ({
		_id: a._id,
		digitalCurrency: a.digitalCurrency,
		fiatCurrency: a.fiatCurrency,
		latestMinedDate: a.latestMinedDate,
		rates: a.rates
	}))
	return exchangeRatesList
}
// Attach helpers to the collection object.
ExchangeRates.helpers({

})

initializeFactory(ExchangeRates)

export default ExchangeRates
