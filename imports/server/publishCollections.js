import { Meteor } from 'meteor/meteor'

import { Accounts as UserAccounts } from 'meteor/accounts-base'
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

			// let accountIds = Profiles.findOne().trackedAccounts.map(
			// 	ta => ta.accountId
			// )

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
			const activeUser = Meteor.user()
			
			if (!activeUser) {
				return null
			}
		
			return Profiles.find({
				_id: activeUser.services['yinpeng-blockeeper'].profileId
			})
		})

		Meteor.publish('exchangeRates', () => {
			// Return the ExchangeRates ETH-USD. if need we can extends base on use's profile	
			return ExchangeRates.find({ }, {
				fields: ExchangeRates.publicFields
			})
		})

		// Publish all users belonging to the current users profile.
		// TODO: once we have a proper permission model this will change.
		Meteor.publish('users', () => {
			const activeUser = Meteor.user()
			
			if (!activeUser) {
				return null
			}

			const activeUserProfileId = activeUser.services['yinpeng-blockeeper']
				.profileId
		
			return UserAccounts.users.find({
				'services.yinpeng-blockeeper.profileId': activeUserProfileId
			}, { 
				fields: {
					_id: 1,
					'services.yinpeng-blockeeper.publicKey': 1,
					'services.yinpeng-blockeeper.name': 1
				}
			})
		})
	}
}
