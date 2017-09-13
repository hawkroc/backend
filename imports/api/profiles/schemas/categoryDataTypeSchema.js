import SimpleSchema  from 'simpl-schema'

/**
 * Defines a category based data type.
 * 
 */
const schema = new SimpleSchema({
	// Name of the data type. Core types can specify 'allowedValues'
	// on extension of this schema.
	name: {
		type: String,
		optional: false
	},

	items: {
		type: Array
	},
	'items.$': { type: Object },
	'items.$._id': { type: String },
	'items.$.label': { type: String },
})

export default schema
