import { Meteor } from "meteor/meteor"
import SimpleSchema from "simpl-schema"

import RatesSchema from "./ratesSchema"

const schema = new SimpleSchema({
    _id: { type: String },

    digitalCurrency: { type: String },
    fiatCurrency: { type: String },
    latestMinedDate: {
        type: Number,
        min: Meteor.settings.public.input_validation.transaction_timestamp
    },
    
    rates: {
        type: Array
    },
    "rates.$": {
        type: RatesSchema
    }
})

export default schema
