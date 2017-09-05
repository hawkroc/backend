import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import HistoricalSchema from '../historicalSchema'

const CurrencySchema = new SimpleSchema({
	_id: { type: String },

	bitCoin: { type: String },
	fiatCurrency: { type: String },
	latestDate: { type: Number },
	hisCurrency: {
		type: [HistoricalSchema]
	}
})

export default CurrencySchema
