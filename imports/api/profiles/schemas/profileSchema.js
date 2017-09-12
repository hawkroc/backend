import SimpleSchema from 'simpl-schema'

import InfoSchema from './infoSchema'
import LabelTypeSchema from './labelTypeSchema'
import TrackedAccountSchema from './trackedAccountSchema'
import LabelSchema from './labelSchema'

import TransactionDataTypesSchema from './transactionDataTypesSchema'
import TransactionDatumSchema from './transactionDatumSchema'

/**
 * User profile related data such as preferences and linked accounts.
 * 
 */
const ProfileSchema = new SimpleSchema({
	_id: {
		type: String
	},

	info: { type: InfoSchema },

	// User's linked accounts.
	trackedAccounts: {
		type: Array
	},
	'trackedAccounts.$': {
		type: TrackedAccountSchema
	},

	transactionDataTypes: {
		type: TransactionDataTypesSchema
	},

	transactionData: {
		type: Array
	},
	'transactionData.$': {
		type: TransactionDatumSchema
	}
})

export default ProfileSchema
