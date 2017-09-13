import { Meteor } from 'meteor/meteor'
import * as methodTypes from './labelMethodTypes'

import Profiles from '../../../api/profiles/profiles'

Meteor.methods({

	/**
     * Insert a new labelType into the user's active profile.
     * 
     * @param {*Insert} param0 
     */
	[ methodTypes.PROFILE_INSERT_LABELTYPE ]({ label, gst }) {
		let activeProfile = Profiles.active()

		Profiles.update(activeProfile._id, {
			$push: {
				'transactionDataTypes.gstLabels.items': {
					// TODO: best way to do IDs?
					_id: new Meteor.Collection.ObjectID().toHexString(),
					label,
					gst
				}
			}
		})
	},

	/**
     * Update a user's label type in their active profile.
     * 
     * @param {*} param0 
     */
	[ methodTypes.PROFILE_UPDATE_LABELTYPE ]({ _id, label, gst }) {
		// TODO: VALIDATION! of user vs profile.
		// let activeProfile = Profiles.active();

		Profiles.update(
			{
				'transactionDataTypes.gstLabels.items._id': _id
			}, {
				$set: {
					'transactionDataTypes.gstLabels.items.$.label': label,
					'transactionDataTypes.gstLabels.items.$.gst': gst
				}
			}
		)
	},

	/**
     * Delete a user's label type in their active profile.
     * 
     * @param {*} param0 
     */
	[ methodTypes.PROFILE_DELETE_LABELTYPE ]({ _id }) {
		let activeProfile = Profiles.active()

		// Remove all transaction labels from the user profile corresponding
		// to this label type.
		Profiles.update(activeProfile._id, {
			$pull: {
				'transactionData': {
					itemId: _id
				}
			}
		})

		// Remove the label type.
		Profiles.update(activeProfile._id, {
			$pull: {
				'transactionDataTypes.gstLabels.items': { 
					_id 
				}
			}
		})
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
			'transactionData.dataTypeName': 'gst-labels'
		}, {
			$pull: {
				'transactionData': {
					transactionId: txId
				}
			},
		})

		// Push the new label against the account/transaction.
		Profiles.update({
			_id: activeProfile._id
		}, {
			$push: {
				'transactionData': {
					transactionId: txId,
					dataTypeName: 'gst-labels',
					itemId: labelTypeId,
					value: 0
				}
			}
		})
	}
})
