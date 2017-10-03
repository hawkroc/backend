import SimpleSchema  from 'simpl-schema'

/**
 * User profile tracked account sub document.
 * 
 */
const TrackedAccountSchema = new SimpleSchema({
	_id: { type: String },

	// References Accounts.address
	accountAddress: { type: String },

	// User's alias for the referenced account.
	alias: { type: String }
})

export default TrackedAccountSchema
