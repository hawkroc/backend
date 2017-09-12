import SimpleSchema  from 'simpl-schema'

import TransactionSchema from './transactionSchema'

const AccountSchema = new SimpleSchema({
	_id: { type: String },

	address: { type: String },
	latestMinedBlock: { type: Number },
	balance: { type: Number },

	transactions: {
		type: Array
	},
	'transactions.$': {
		type: TransactionSchema
	}
})

export default AccountSchema
