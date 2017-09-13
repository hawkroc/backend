import SimpleSchema  from 'simpl-schema'

/**
 * A datum of typed transaction data.
 * 
 */
const schema = new SimpleSchema({
	// References unique transaction hash
	transactionId: { type: String },

	// References transactionDataTypes.$.name
	dataTypeName: { type: String },

	// References transactionDataTypes.$.items.$._id
	itemId: { type: String },

	// Value if computed?
	value: { type: String }
})

export default schema
