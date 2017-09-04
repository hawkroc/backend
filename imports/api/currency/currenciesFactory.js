import { Factory } from 'meteor/dburles:factory'

export const initializeFactory = (currenciesCollection) => {
	Factory.define('currency', currenciesCollection, {
		bitCoin: () => 'ETH',
		fiatCurrency: () => 'USD',
		latestDate: () => 0,
		hisCurrency: () => [],


	})
}
