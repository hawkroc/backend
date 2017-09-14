

export default {
	generate: () => {
		let fixtures = [
			{
				digitalCurrency: 'ETH',
				fiatCurrency: 'USD',
				latestMinedDate: 0,
				// this hard code only for test before synchronize currency from api
				rates: []
			},
			{
				digitalCurrency: 'BTC',
				fiatCurrency: 'USD',
				latestMinedDate: 0,
				// this hard code only for test before synchronize currency from api
				rates: []
			}
		]

		return fixtures
	}
}
