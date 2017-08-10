import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'

//import Transactions from '../transactions/transactions.js';

class AccountsCollection extends Mongo.Collection {
    insert(account, callback) {
        // TODO: We could use this to trigger a call to retrieve transactions for the
        // newly added account. Also to validate if the account if possible.

        return super.insert(account, callback);
    }

    remove(selector, callback) {
        // Cascade removal to all associated transactions.
        // TODO: Transactions.remove({ account: selector });
        return super.remove(selector, callback);
    }
}

const Accounts = new AccountsCollection('accounts')

// Allow and deny rules for operations against this collection.
// Return 'true' to allow/deny based on authorization logic.
Accounts.deny({
    insert() { return true; },
    remove() { return true; }
})

Accounts.allow({
    update() { return true; },
})

Accounts.schema = new SimpleSchema({
    _id: { type: String, regEx: SimpleSchema.RegEx.Id },
    address: { type: String },
    alias: { type: String }
})

Accounts.attachSchema(Accounts.schema)

// Fields of the collection items that are made available to the client.
Accounts.publicFields = {
    address: 1,
    alias: 1
}

// Attach helpers to the collection object.
Accounts.helpers({
    // TODO:
    // transactions () {
    //     return transactions.find({ account: this.address }, { sort: { createdAt: -1 } });
    // }
})

export default Accounts;