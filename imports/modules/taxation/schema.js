import SimpleSchema  from 'simpl-schema'

import ModuleSchema from '../moduleSchema'
import CategoryDataTypeSchema from '../common/categoryDataTypeSchema'

const TaxCodesSchema = new SimpleSchema({
	// Extend the category items with a tax code ID value.
	'items.$.codeId': { type: String },
	'items.$.rate': { type: Number }
})
TaxCodesSchema.extend(CategoryDataTypeSchema)

const schema = new SimpleSchema({
	name: {
		type: String,
		allowedValues: ["taxation"]
	},

	taxCodes: {
		type: TaxCodesSchema
	},
	
	processed: {
		type: Array
	},
	'processed.$': {
		type: Object
	},
	'processed.$.codeId': {
		type: String
	},
	'processed.$.transactionId': {
		type: String
	},
	'processed.$.grossTax': {
		type: Number
	},
	'processed.$.netValue': {
		type: Number
	}
})

schema.extend(ModuleSchema)

export default schema