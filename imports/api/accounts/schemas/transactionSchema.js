import SimpleSchema  from 'simpl-schema'

const TransactionSchema = new SimpleSchema({
	_id: { type: String },

	contractAddress: {
		type: String
	},
	blockNumber: {
		type: Number
	},
	timeStamp: {
		type: Number
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
		type: String
	},
	to: {
		type: String
	},
	gas: {
		type: Number
	},
	gasPrice: {
		type: Number
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
