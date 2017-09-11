import SimpleSchema from 'simpl-schema'

import InfoSchema from './infoSchema'
import LabelTypeSchema from './labelTypeSchema'
import TrackedAccountSchema from './trackedAccountSchema'
import LabelSchema from './labelSchema'

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

	// User-defined labels for tagging transactions.
	labelTypes: {
		type: Array
	},
	'labelTypes.$': {
		type: LabelTypeSchema
	},

	// User's assignment of labels to transactions.
	labels: {
		type: Array
	},
	'labels.$': {
		type: LabelSchema
	}
})

export default ProfileSchema
