import { Meteor } from 'meteor/meteor'

import Accounts from '../api/accounts/accounts'
import Profiles from '../api/profiles/profiles'
import ExchangeRates from '../api/exchangeRates/exchangeRates'

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
				// _id: { 
				// 	$in: accountIds
				// }
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

		Meteor.publish('exchangeRates', () => {
			// Return the ExchangeRates ETH-USD. if need we can extends base on use's profile	
			return ExchangeRates.find({ }, {
				fields: ExchangeRates.publicFields
			})
		})
	}
}
