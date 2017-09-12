import SimpleSchema  from 'simpl-schema'

const HistoricalSchema = new SimpleSchema({
	_id: { type: String },

	high: {
		type: Number,
		defaultValue: 0
	},
	time: {
		type: Number,
		defaultValue: 0
	},
	average: {
		type: Number,
		defaultValue: 0
	},
	open: {
		type: Number,
		defaultValue: 0
	},
	low: {
		type: Number,
		defaultValue: 0
	},
	volume: {
		type: Number,
		defaultValue: 0
	}
})

export default HistoricalSchema
