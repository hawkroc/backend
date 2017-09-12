import { Factory } from 'meteor/dburles:factory'

export const initializeFactory = (exchangeRateCollection) => {
	Factory.define('exchangeRate', exchangeRateCollection, {
		bitCoin: () => 'ETH',
		fiatCurrency: () => 'USD',
		latestDate: () => 0,
		hisCurrency: () => [],


	})
}
