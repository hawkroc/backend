import { Meteor } from 'meteor/meteor'

import Accounts from '../../accounts/accounts'
import Profiles from '../../profiles/profiles'

/**
 * Serverside only - publish collections to clients.
 * 
 */
export default {
	apply: () => {
		Meteor.publish('accounts', () => {
			// Get the user's currently tracked accounts only.
			let accountIds = Profiles.active().trackedAccounts.map(
				ta => ta.accountId
			)

			return Accounts.find({
				_id: {
					$in: accountIds
				}
			}, { fields: Accounts.publicFields }
			)
		})

		Meteor.publish('profiles', () => {
			// Return the first profile to the client only for now.
			// This will eventually be selected based on the logged in user.
			return Profiles.find({ }, {
				fields: Profiles.publicFields
			})
		})
	}
}
