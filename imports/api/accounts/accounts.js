import { Mongo } from 'meteor/mongo'
import { initializeFactory } from './accountsFactory'

import AccountSchema from './schemas/accountSchema'

class AccountsCollection extends Mongo.Collection {
	insert(account, callback) {
		// TODO: We could use this to trigger a call to retrieve transactions for the
		// newly added account.

		return super.insert(account, callback)
	}
}

const Accounts = new AccountsCollection('accounts')
// TODO: why is schema validation so slow...
Accounts.attachSchema(AccountSchema)

// Allow and deny rules for operations against this collection.
// Return 'true' to allow/deny based on authorization logic.
Accounts.deny({
	insert() { return true },
	update() { return true },
	remove() { return true }
})

// Fields of the collection items that are made available to the client.
Accounts.publicFields = {
	address: 1,
	transactions: 1,
	latestMinedBlock: 1,
	balance: 1
}

// Attach helpers to the collection object.
Accounts.helpers({
	// TODO:
	// transactions () {
	//     return transactions.find({ account: this.address }, { sort: { createdAt: -1 } });
	// }
})

initializeFactory(Accounts)

export default Accounts
