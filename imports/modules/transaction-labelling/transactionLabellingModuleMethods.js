import { Meteor } from 'meteor/meteor'
import * as methodTypes from './transactionLabellingModuleMethodTypes'

import Profiles from '../../api/profiles/profiles'

Meteor.methods({

	/**
     * Insert a new labelType into the user's active profile.
     * 
     * @param {*Insert} param0 
     */
	[ methodTypes.PROFILE_INSERT_LABELTYPE ]({ label }) {
		let activeProfile = Profiles.active()

		// Test module is enabled on profile.
		if (!activeProfile.isModuleEnabled('transaction-labelling')) {
			console.warn("Attempted top interact with disabled module")
			return
		}

		Profiles.update({ 
			_id: activeProfile._id,
			'modules.name': 'transaction-labelling' 
		}, {
			$push: {
				'modules.$.labelTypes.items': {
					_id: new Meteor.Collection.ObjectID().toHexString(),
					label
				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
	},

	/**
     * Update a user's label type in their active profile.
     * 
     * @param {*} param0 
     */
	[ methodTypes.PROFILE_UPDATE_LABELTYPE ]({ _id, label }) {
		// TODO: VALIDATION! of user vs profile.
		let activeProfile = Profiles.active();

		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'transaction-labelling'
		}, {
			$pull: {
				'modules.$.labelTypes.items': {
					_id
				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })

		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'transaction-labelling'
		}, {
			$push: {
				'modules.$.labelTypes.items': {
					_id,
					label
				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
	},

	/**
     * Delete a user's label type in their active profile.
     * 
     * @param {*} param0 
     */
	[ methodTypes.PROFILE_DELETE_LABELTYPE ]({ _id }) {
		let activeProfile = Profiles.active()

		// Test module is enabled on profile.
		if (!activeProfile.isModuleEnabled('transaction-labelling')) {
			console.warn("Attempted top interact with disabled module")
			return
		}

		// Remove all transaction labels from the user profile corresponding
		// to this label type.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'transaction-labelling'
		}, {
			$pull: {
				'modules.$.labelled': {
					labelTypeId: _id
				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })

		// Remove the label type.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'transaction-labelling'
		}, {
			$pull: {
				'modules.$.labelTypes.items': {
					_id
				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
	},

	/**
     * Update the active user's label for a transaction.
     * 
     * @param {*} param0 
     */
	[ methodTypes.PROFILE_UPDATE_LABEL ]({ txId, labelTypeId }) {
		let activeProfile = Profiles.active()

		// TODO: validate label type with existing types.

		// Pull all exising labels for provided transaction ID.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'transaction-labelling'
		}, {
			$pull: {
				'modules.$.labelled': {
					transactionId: txId
				}
			},
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })

		// Push the new label against the account/transaction.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'transaction-labelling'
		}, {
			$push: {
				'modules.$.labelled': {
					transactionId: txId,
					labelTypeId
				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
	}
})
