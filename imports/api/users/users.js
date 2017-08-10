import { Mongo } from 'meteor/mongo'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
//import {Record} from './records'

//import Transactions from '../transactions/transactions.js';

class UsersCollection extends Mongo.Collection {
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

const Users = new UsersCollection('Users')

// Don't let the client update the collection for now.
// The server can still use all of these just fine.
Users.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})

Users.schema = new SimpleSchema({
  _id:{type:String},
  userInfo:{type:{userName:{type:String}}},
  accounts:{type:[
  { 
	accountId: {type:String} ,
	alias: {type:String},
	labels:{type: [
					{
						txId: {type:String},
						labelId: {type:String},
						data:{type:Object}
					}
				  ]
            }

  }
  ]},
	labels: {type:[
			{
				_id: {type:String},
				name: {type:String},
				
				data: {
					gst: {type:Boolean},
				
				}
			}
		]
    }
  
})

Users.attachSchema(Users.schema)

// Fields of the collection items that are made available to the client.
Users.publicFields = {
    _id:1,
    userInfo: 1,
    accounts: 1,
    labels:1
}

// Attach helpers to the collection object.
Users.helpers({
    // TODO:
    // transactions () {
    //     return transactions.find({ account: this.address }, { sort: { createdAt: -1 } });
    // }
})

export default Users;