import { Mongo } from 'meteor/mongo'
import { initializeFactory } from './profilesFactory'

import './methods/trackedAccountMethods'
import './methods/userMethods'

import ProfileSchema from './schemas/profileSchema'

class ProfilesCollection extends Mongo.Collection { }
const Profiles = new ProfilesCollection('profiles')

// Don't let the client update the collection for now.
// The server can still use all of these just fine.
Profiles.deny({
	insert() { return true },
	update() { return true },
	remove() { return true }
})

Profiles.attachSchema(ProfileSchema)

// Fields of the collection items that are made available to the client.
Profiles.publicFields = {
	info: 1,
	modules: 1,
	trackedAccounts: 1,
	transactionDataTypes: 1,
	transactionData: 1
}

// Attach helpers to the collection object.
Profiles.helpers({

	// Is a named application module enabled for this profile.
	isModuleEnabled(moduleName) {
		if (!this.modules) {
			return false
		}

		let module = this.modules.find(m => m.name === moduleName)
		return !!module && module.metadata.enabled
	},

	// Retrieve the named application module.
	getModule(moduleName) {
		return this.modules.find(m => m.name === moduleName)
	}
})

initializeFactory(Profiles)

export default Profiles
