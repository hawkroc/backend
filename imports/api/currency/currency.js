import { Mongo } from 'meteor/mongo'
import { initializeFactory } from './currenciesFactory'

class CurrenciesCollection extends Mongo.Collection {
	insert(currency, callback) {
		return super.insert(currency, callback)
	}

	remove(selector, callback) {
		return super.remove(selector, callback)
	}
}

const Currencies = new CurrenciesCollection('currencies')

Currencies.deny({
	insert() { return true },
	remove() { return true }
})

// Fields of the collection items that are made available to the client.
Currencies.publicFields = {
	bitCoin: 1,
	fiatCurrency: 1,
	latestDate: 1,
	hisCurrency: 1
}

Currencies.active = () => {
	// TODO can get currency base on differnt config e.g(from:ETH,to:USD)

	return Currencies.findOne()
}
// Attach helpers to the collection object.
Currencies.helpers({

})

initializeFactory(Currencies)

export default Currencies
