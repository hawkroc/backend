import SimpleSchema  from 'simpl-schema'
import { Meteor } from 'meteor/meteor'

const schema = new SimpleSchema({
	timestamp: {
		type: Number,
		min: Meteor.settings.public.input_validation.transaction_timestamp
	},
	value: {
		type: Number,
		defaultValue: 0, 
		min: 0
	}
})

export default schema
