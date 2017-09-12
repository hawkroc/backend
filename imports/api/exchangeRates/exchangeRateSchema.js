import SimpleSchema  from 'simpl-schema'

import HistoricalSchema from '../historicalSchema'

const ExchangeRateSchema = new SimpleSchema({
	_id: { type: String },

	bitCoin: { type: String },
	fiatCurrency: { type: String },
	latestDate: { type: Number },
	hisCurrency: {
		type: [HistoricalSchema]
	}
})

export default ExchangeRateSchema
