import SimpleSchema from 'simpl-schema'

import InfoSchema from './infoSchema'
import TrackedAccountSchema from './trackedAccountSchema'
import TransactionDataTypesSchema from './transactionDataTypesSchema'
import TransactionDatumSchema from './transactionDatumSchema'

import TaxationModuleSchema from '../../../modules/taxation/taxationModuleSchema'
import TransactionLabellingModuleSchema from '../../../modules/transaction-labelling/transactionLabellingModuleSchema'

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
	//'modules.$': {
		//type: Object
		// TODO: bug needs fixing for this to work with sub-schemas: https://github.com/aldeed/node-simple-schema/issues/112
		// Add further valid module defs here.
		// type: SimpleSchema.oneOf(
		// 	TransactionLabellingModuleSchema,
		// 	TaxationModuleSchema
		// )
	//}
})

export default ProfileSchema
