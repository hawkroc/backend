import SimpleSchema  from 'simpl-schema'

/**
 * Defines a category based data type.
 * 
 */
const schema = new SimpleSchema({
	items: {
		type: Array
	},
	'items.$': { type: Object },
	'items.$._id': { type: String },
	'items.$.label': { type: String },
})

export default schema
