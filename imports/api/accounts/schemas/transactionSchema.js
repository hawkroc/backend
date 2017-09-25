import SimpleSchema  from 'simpl-schema'
import { Meteor } from 'meteor/meteor'
const TransactionSchema = new SimpleSchema({
	_id: { type: String },

	contractAddress: {
		type: String
	},
	blockNumber: {
		type: Number, min: 0
	},
	timeStamp: {
		type: Number, min: Meteor.settings.public.input_validation.transaction_timestamp
	},
	hash: {
		type: String
	},
	nonce: {
		type: String
	},
	blockHash: {
		type: String
	},
	transactionIndex: {
		type: String
	},
	from: {
		type: String, regEx: Meteor.settings.public.input_validation.account_address
	},
	to: {
		type: String, regEx: Meteor.settings.public.input_validation.account_address
	},
	gas: {
		type: Number, min: 0
	},
	gasPrice: {
		type: Number, min: 0
	},
	gasUsed: {
		type: String
	},
	cumulativeGasUsed: {
		type: String
	},

	isError: {
		type: String
	},
	input: {
		type: String
	},
	confirmations: {
		type: String
	},
	value: {
		type: String
	}
})

export default TransactionSchema
