import SimpleSchema from "simpl-schema";
import { Meteor } from "meteor/meteor";
import RatesSchema from "./ratesSchema";

const ExchangeRateSchema = new SimpleSchema({
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
});

export default ExchangeRateSchema;
