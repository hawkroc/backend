import SimpleSchema from 'simpl-schema'

import InfoSchema from './infoSchema'
import TrackedAccountSchema from './trackedAccountSchema'
import TransactionDataTypesSchema from './transactionDataTypesSchema'
import TransactionDatumSchema from './transactionDatumSchema'

import TaxationModuleSchema from '../../../modules/taxation/taxationModuleSchema'

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

	modules: {
		type: Array
	},
	'modules.$': {
		// Add further valid module defs here.
		type: SimpleSchema.oneOf(
			TaxationModuleSchema
		)
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
