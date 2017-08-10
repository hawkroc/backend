import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

const TransactionSchema = new SimpleSchema({
    _id: { 
        type: String, 
        regEx: SimpleSchema.RegEx.Id 
    },

    address: { type: String },
    contractAddress: { type: String },

    blockNumber: { type: Number },
    timeStamp: { type: String },

    from: { type: String },
    to: { type: String },

    gas: { type: Number },
    gasPrice: { type: Number },
    gasUsed: { type: String },
    cumulativeGasUsed: { type: String },

    isError: { type: String },
    input: { type: String },
    confirmations: { type: String },

    value: { type: Number }
})

export default TransactionSchema