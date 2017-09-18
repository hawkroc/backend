import SimpleSchema  from 'simpl-schema'
import { Meteor } from 'meteor/meteor'
const Rate = new SimpleSchema({
	_id: { type: String },

	high: {
		type: Number,
		defaultValue: 0, min: 0
	},
	time: {
		type: Number,
		defaultValue: 0,
		min: Meteor.settings.public.input_validation.transaction_timestamp
	},
	average: {
		type: Number,
		defaultValue: 0, min: 0
	},
	open: {
		type: Number,
		defaultValue: 0, min: 0
	},
	low: {
		type: Number,
		defaultValue: 0, min: 0
	},
	volume: {
		type: Number,
		defaultValue: 0, min: 0
	}
})

export default Rate
