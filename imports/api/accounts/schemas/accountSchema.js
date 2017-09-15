import SimpleSchema from "simpl-schema";
import TransactionSchema from "./transactionSchema";
import { Meteor } from "meteor/meteor";
const AccountSchema = new SimpleSchema({
  _id: { type: String },

  address: {
    type: String,
    regEx: Meteor.settings.public.input_validation.account_address
  },
  latestMinedBlock: { type: Number, min: 0 },
  balance: { type: Number, min: 0 },

  transactions: {
    type: Array
  },
  "transactions.$": {
    type: TransactionSchema
  }
});

export default AccountSchema;
