import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

/**
 * User profile label assignment sub document.
 * 
 */
const LabelSchema = new SimpleSchema({
    
	// References Accounts.transactions._id
	transactionId: { type: String },

	// References Users.labels._id
	labelTypeId: { type: String }
})

export default LabelSchema