import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

import LabelSchema from './labelSchema'

/**
 * User profile tracked account sub document.
 * 
 */
const TrackedAccountSchema = new SimpleSchema({
    _id: { type: String },
    
     // References Accounts._id
    accountId: { type: String },

    // User's alias for the referenced account.
    alias: { type: String },

    // User's assignment of labels to transactions.
    labels: {
        type: [LabelSchema]
    }
})

export default TrackedAccountSchema