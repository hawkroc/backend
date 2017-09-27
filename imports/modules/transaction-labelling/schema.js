import SimpleSchema  from 'simpl-schema'

import ModuleSchema from '../moduleSchema'
import CategoryDataTypeSchema from '../common/categoryDataTypeSchema'

const schema = new SimpleSchema({
	name: {
		type: String,
		allowedValues: ["transaction-labelling"]
	},

	labelTypes: {
		type: CategoryDataTypeSchema
	},
	
	labelled: {
		type: Array
	},
	'labelled.$': {
		type: Object
	},
	'labelled.$.transactionId': {
		type: String
	},
	'labelled.$.labelTypeId': {
		type: String
	}
})

schema.extend(ModuleSchema)

export default schema