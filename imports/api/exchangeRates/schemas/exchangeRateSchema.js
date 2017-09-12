import SimpleSchema  from 'simpl-schema'

import Rate from './ratesSchema'

const ExchangeRateSchema = new SimpleSchema({
	_id: { type: String },

	digitalCurrency: { type: String },
	fiatCurrency: { type: String },
	latestMinedDate: { type: Number },
	rates: {
		type: [Rate]
	},
	'rates.$': {
		type: Rate
	}
})

export default ExchangeRateSchema
