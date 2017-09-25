import { Factory } from 'meteor/dburles:factory'

export const initializeFactory = (exchangeRateCollection) => {
	Factory.define('exchangeRates', exchangeRateCollection, {
		digitalCurrency: () => 'ETH',
		fiatCurrency: () => 'USD',
		latestMinedDate: () => 0,
		rates: () => [],


	})
}
