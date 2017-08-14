import {Mongo} from 'meteor/mongo'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'

const TransactionSchema = new SimpleSchema({
    _id: { type: String },
    contractAddress: {
        type: String,
        defaultValue: ""
    },
    blockNumber: {
        type: Number,
        defaultValue: 0
    },
    timeStamp: {
        type: Number,
        defaultValue: 0
    },
    hash: {
        type: String,
        defaultValue: ""
    },
    nonce: {
        type: String,
        defaultValue: ""
    },
    blockHash: {
        type: String,
        defaultValue: ""
    },
    transactionIndex: {
        type: String,
        defaultValue: ""
    },
    from: {
        type: String,
        defaultValue: ""
    },
    to: {
        type: String,
        defaultValue: ""
    },
    gas: {
        type: Number,
        defaultValue: 0
    },
    gasPrice: {
        type: Number,
        defaultValue: 0
    },
    gasUsed: {
        type: String,
        defaultValue: ""
    },
    cumulativeGasUsed: {
        type: String,
        defaultValue: ""
    },

    isError: {
        type: String,
        defaultValue: ""
    },
    input: {
        type: String,
        defaultValue: ""
    },
    confirmations: {
        type: String,
        defaultValue: ""
    },
    value: {
        type: String,
        defaultValue: ""
    }
})

export default TransactionSchema