import { Mongo } from 'meteor/mongo'
import { initializeFactory } from './accountsFactory'

class AccountsCollection extends Mongo.Collection {
	insert(account, callback) {
		// TODO: We could use this to trigger a call to retrieve transactions for the
		// newly added account. Also to validate if the account if possible.

		return super.insert(account, callback)
	}

	remove(selector, callback) {
		// TODO: should probably check and not remove account if at least one user is
		// referencing it.
		return super.remove(selector, callback)
	}
}

const Accounts = new AccountsCollection('accounts')
// TODO: why is schema validation so slow...
// Accounts.attachSchema(AccountSchema)

// Allow and deny rules for operations against this collection.
// Return 'true' to allow/deny based on authorization logic.
Accounts.deny({
	insert() { return true },
	remove() { return true }
})

Accounts.allow({
	update() { return true },
})

Accounts.active = ()=>{
	let test = Accounts.find().fetch()
	console.log('t.test  ' + test.length)
	return  test  // activeProfile;
}


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
