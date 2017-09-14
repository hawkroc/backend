import { Factory } from 'meteor/dburles:factory'

export const initializeFactory = (exchangeRateCollection) => {
	Factory.define('exchangeRate', exchangeRateCollection, {
		digitalCurrency: () => 'ETH',
		fiatCurrency: () => 'USD',
		latestMinedDate: () => 0,
		rates: () => [],


	})
}
