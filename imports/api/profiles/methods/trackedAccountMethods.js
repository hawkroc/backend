import * as methodTypes from './trackedAccountMethodTypes'
import { Meteor } from 'meteor/meteor'
import Profiles from '../../../api/profiles/profiles'
import Accounts from '../../../api/accounts/accounts'

import { sanitizeAddressString } from '../../../common/inputTransformationHelpers'

Meteor.methods({

	/**
	 * Insert a new tracked account into a user's active profile.
	 * 
	 * @param {*} param0 
	 */
	[methodTypes.PROFILE_INSERT_TRACKEDACCOUNT]({ alias, address }) {
		let activeProfile = Profiles.findOne()

		// Address string validation.
		let validatedAddress = sanitizeAddressString(address)
		if (!validatedAddress) {
			console.warn("PROFILE_INSERT_TRACKEDACCOUNT: invalid address provided")
			return
		}

		// Currently our stored addresses are prefixed.
		validatedAddress = '0x' + validatedAddress

		// Ensure the account is not already tracked on this profile. This should also be handled
		// interactively on the client-side.
		if(activeProfile.trackedAccounts.filter(
			ta => ta.accountAddress === validatedAddress
		).length > 0) {
			console.log(`PROFILE_INSERT_TRACKEDACCOUNT: profile already tracks this address`)
			return null
		}

		console.log(`PROFILE_INSERT_TRACKEDACCOUNT: profile ${activeProfile._id} wishes to track ${validatedAddress}`)

		// Add the tracked account to the profile.
		// Technically, all valid account strings represent valid accounts even if an account
		// has not been processed on the blockchain. Therefore we can always insert a new tracked
		// account.
		Profiles.update(activeProfile._id, {
			$push: {
				'trackedAccounts': {
					// TODO: best way to do IDs?
					_id: new Meteor.Collection.ObjectID().toHexString(),
					alias,
					accountAddress: validatedAddress
				}
			}
		})

		// If the user is tracking an account that does not yet exist in our system,
		// create it.
		let account = Accounts.findOne({ address: validatedAddress })

		if (!account) {
			console.log(`PROFILE_INSERT_TRACKEDACCOUNT: account ${validatedAddress} does not exist. Creating and linking...`)

			// TODO: use factory.
			Accounts.insert({
				address: validatedAddress,
				transactions: [ ],
				latestMinedBlock: 0,
				balance: 0
			})
		} else {
			console.log(`PROFILE_INSERT_TRACKEDACCOUNT: account ${validatedAddress} alreading exists. Linked.`)
		}

		// TODO: tigger initial transaction mining for this account?
	},

	/**
	 * Update a user's tracked account in their active profile.
	 * 
	 * @param {*} param0 
	 */
	[methodTypes.PROFILE_UPDATE_TRACKEDACCOUNT]({ _id, alias }) {
		let activeProfile = Profiles.findOne()

		Profiles.update(
			{
				_id: activeProfile._id,
				'trackedAccounts._id': _id
			}, {
				$set: {
					'trackedAccounts.$.alias': alias
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
		let activeProfile = Profiles.findOne()

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
			let trackerCount = Profiles.find({ 'trackedAccounts.accountAddress': {
				$eq: toDelete.accountAddress
			} }).count()

			if (trackerCount === 0) {
				Accounts.remove({ address: toDelete.accountAddress })
			}
		}
	}
})
