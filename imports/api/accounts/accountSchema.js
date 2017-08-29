import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import TransactionSchema from '../transactions/transactionSchema'

const AccountSchema = new SimpleSchema({
	_id: { type: String },

	address: { type: String },
	latestMinedBlock: { type: Number },
	balance: { type: Number },
	transactions: {
		type: [ TransactionSchema ]
	}

})

export default AccountSchema
