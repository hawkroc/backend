import SimpleSchema  from 'simpl-schema'

import CategoryDataTypeSchema from '../../../modules/common/categoryDataTypeSchema'

const GstLabelsSchema = new SimpleSchema({
	// Specify only a single name for this core data type.
	name: {
		type: String,
		allowedValues: ['gst-labels']
	},

	// Extend the category items with a GST value.
	'items.$.gst': { type: Boolean }
})
GstLabelsSchema.extend(CategoryDataTypeSchema)

/**
 * Transaction data types. Core and custom.
 * 
 */
const schema = new SimpleSchema({
	gstLabels: {
		type: GstLabelsSchema
	}

	// TODO: more flexible custom data-types.
})

export default schema
