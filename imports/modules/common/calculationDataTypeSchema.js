import SimpleSchema  from 'simpl-schema'

/**
 * Defines a calculation based data type.
 * 
 */
const schema = new SimpleSchema({
	// Name of the data type. Core types can specify 'allowedValues'
	// on extension of this schema.
	name: {
		type: String,
		optional: false
	},

    // Unix timestamp. When the inputs were last updated. Calculations
    // done before this timestamp may need to be re-run.
	inputsLastUpdated: {
        type: Number
    }
})

export default schema
