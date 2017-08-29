import { SimpleSchema } from 'meteor/aldeed:simple-schema'

/**
 * User profile label type sub document.
 * 
 */
const LabelTypeSchema = new SimpleSchema({
	_id: { type: String },

	name: { type: String },

	// Data associated with label. Should be nested into a data[] subdoc
	// when we need to add more data types.
	gst: { type: Boolean }
})

export default LabelTypeSchema
