import * as methodTypes from './trackedAccountMethodTypes'
import { Meteor } from 'meteor/meteor'
import Profiles from '../../../api/profiles/profiles'
import Accounts from '../../../api/accounts/accounts'

Meteor.methods({

	/**
     * Insert a new tracked account into a user's active profile.
     * 
     * @param {*} param0 
     */
	[methodTypes.PROFILE_INSERT_TRACKEDACCOUNT]({ alias, address }) {
		// TODO: VALIDATION! of user vs ptrackedAccountMethodTypesrofile.
		// TODO: address validation!
		// TODO: profile collection factories!
		let activeProfile = Profiles.active()

		console.log(`PROFILE_INSERT_TRACKEDACCOUNT: profile ${activeProfile._id} wishes to track ${address}`)

		// If the user is tracking an account that does not yet exist in our system,
		// create it.
		let account = Accounts.findOne({ address })
		let accountId = null

		if (!account) {
			console.log(`PROFILE_INSERT_TRACKEDACCOUNT: account ${address} does not exist. Creating and linking...`)

			// TODO: use factory.
			accountId = Accounts.insert({
				address,
				transactions: [ ],
				latestMinedBlock: 0
			})
		} else {
			console.log(`PROFILE_INSERT_TRACKEDACCOUNT: account ${address} alreading exists. Linking...`)

			accountId = account._id
			// if this accountid already in profile trackAddress will return "you already track this address"
			if(activeProfile.trackedAccounts.filter(
				ta => ta.accountId === accountId
			).length > 0) {
				// throw new Meteor.Error("you already track this address ");
				return null
			}
		}

		if (!account) {
			accountId = Accounts.insert({
				address,
				transactions: [ ],
				latestMinedBlock: 0
			})
		} else {
			accountId = account._id
			// if this accountid already in profile trackAddress will return "you already track this address"
			if( activeProfile.trackedAccounts.filter(ta => ta.accountId === accountId)
				.length > 0) {
				// throw new Meteor.Error("you already track this address ");
				return null
			}
		}

		Profiles.update(activeProfile._id, {
			$push: {
				'trackedAccounts': {
					// TODO: best way to do IDs?
					_id: new Meteor.Collection.ObjectID().toHexString(),
					alias,
					accountId
				}
			}
		})

		// TODO: tigger initial transaction mining for this account?
	},

	/**
     * Update a user's tracked account in their active profile.
     * 
     * @param {*} param0 
     */
	[methodTypes.PROFILE_UPDATE_TRACKEDACCOUNT]({_id, alias}) {
		// TODO: VALIDATION! of user vs profile.

		let activeProfile = Profiles.active()

		Profiles.update(
			{
				_id: activeProfile._id,
				'trackedAccounts._id': _id
			}, {
				$set: {
					'trackedAccounts.$.alias': alias,
					// 'trackedAccounts.$.accountId': accountId
				}
			}
		)
	},

	/**
     * Delete a user's tracked account type in their active profile.
     * 
     * @param {*} param0 
     */
	[methodTypes.PROFILE_DELETE_TRACKEDACCOUNT]({ _id }) {
		let activeProfile = Profiles.active()

		let toDelete = activeProfile.trackedAccounts
			.find(ta => ta._id === _id)

		if (toDelete) {
			// Delete.
			Profiles.update(activeProfile._id, {
				$pull: {
					'trackedAccounts': { _id }
				}
			})

			// If this is the last user tracking an account in our Accounts collection,
			// remove the account from the collection also.
			let trackerCount = Profiles.find({ 'trackedAccounts.accountId': {
				$eq: toDelete.accountId
			} }).count()

			if (trackerCount === 0) {
				Accounts.remove(toDelete.accountId)
			}
		}
	}
})
