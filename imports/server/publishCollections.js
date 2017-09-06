import { Meteor } from 'meteor/meteor'

import Accounts from '../api/accounts/accounts'
import Profiles from '../api/profiles/profiles'
import Currencies from '../api/currency/currency'

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
			},
			// Options 
			{
				fields: Accounts.publicFields
			})
		})

		Meteor.publish('profiles', () => {
			// Return the first profile to the client only for now.
			// This will eventually be selected based on the logged in user.
			return Profiles.find({ }, {
				fields: Profiles.publicFields
			})
		})

		Meteor.publish('currencies', () => {
			// Return the Currencies ETH-USD. if need we can extends base on use's profile	
			return Currencies.find({ }, {
				fields: Currencies.publicFields
			})
		})
	}
}
