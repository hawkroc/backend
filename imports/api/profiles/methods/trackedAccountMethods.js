import { Meteor } from 'meteor/meteor'

import * as methodTypes from './trackedAccountMethodTypes'

import Profiles from '../../../api/profiles/profiles'
import Accounts from '../../../api/accounts/accounts'

Meteor.methods({

	/**
     * Insert a new tracked account into a user's active profile.
     * 
     * @param {*} param0 
     */
	[ methodTypes.PROFILE_INSERT_TRACKEDACCOUNT ]({ alias, address }) {
		// TODO: VALIDATION! of user vs profile.
		// TODO: address validation!
		// TODO: profile collection factories!
		let activeProfile = Profiles.active()

		// If the user is tracking an account that does not yet exist in our system,
		// create it.
		let account = Accounts.findOne({ address })
		let accountId = null

		if (!account) {
			accountId = Accounts.insert({
				address,
				transactions: [ ],
				latestMinedBlock: 0
			})
		} else {
			accountId = account._id
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
	[ methodTypes.PROFILE_UPDATE_TRACKEDACCOUNT ]({ _id, alias }) {
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
	[ methodTypes.PROFILE_DELETE_TRACKEDACCOUNT ]({ _id }) {
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
			}}).count()

			if (trackerCount === 0) {
				Accounts.remove(toDelete.accountId)
			}
		}
	}
})
