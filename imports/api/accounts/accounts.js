import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
//import {Record} from './records'

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

// Don't let the client update the collection for now.
// The server can still use all of these just fine.
Accounts.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})

Accounts.schema = new SimpleSchema({
    _id: {type:String},
    address: { type: String },
    latestMinedBlock: {type:Number},
    transactions: {type:[
        {      
				_id: {type:String},				
				address:{type:String},
				blockNumber: {type:Number},
				timeStamp: {type:String},
				from:{type:String},
				to:{type:String},
				gas:{type:Number},
				gasPrice:{type:Number},
				isError:{type:String},
				input:{type:String},
				contractAddress:{type:String},
				cumulativeGasUsed:{type:String},
				gasUsed:{type:String},
				confirmations:{type:String},
				value:{type:Number}, 
        }
    
    
    ]}
  
})

Accounts.attachSchema(Accounts.schema)

// Fields of the collection items that are made available to the client.
Accounts.publicFields = {
    _id:1,
    address: 1,
    transactions: 1,
    latestMinedBlock:1
}

// Attach helpers to the collection object.
Accounts.helpers({
    // TODO:
    // transactions () {
    //     return transactions.find({ account: this.address }, { sort: { createdAt: -1 } });
    // }
})

export default Accounts;