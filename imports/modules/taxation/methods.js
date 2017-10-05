import { Meteor } from 'meteor/meteor'

import Profiles from '../../api/profiles/profiles'
import Accounts from '../../api/accounts/accounts'

import * as methodTypes from './methodTypes'

// TODO: decouple.
const makeProcessedEntry = (transactionId, taxCodeId) => {
	const module = Profiles.findOne().getModule('taxation')
	const taxCode = module.taxCodes.items.find(tc => tc.codeId === taxCodeId)
	const txAccount = Accounts.findOne({"transactions._id": transactionId})

	if (!taxCode) {
		console.warn("Unkown tax code supplied")
		return null
	}

	if (!txAccount) {
		console.warn("Cannot locate Account corresponding to supplied transaction ID")
		return null
	}

	const tx = txAccount.transactions
		.find(tx => tx._id === transactionId)

	// Test for divide-by-zero
	const inclusiveTaxRate = 1 + taxCode.rate
	const baseValue = inclusiveTaxRate === 0 ? 0 
		: tx.value / inclusiveTaxRate

	return {
		transactionId,
		codeId: taxCodeId,
		grossTax: tx.value - baseValue,
		netValue: baseValue
	}
}

Meteor.methods({




	/**
	 * Insert a new tax rate into the user's active profile.
	 * 
	 * @param {*Insert} param0 
	 */
	[ methodTypes.PROFILE_MODULE_TAXATION_INSERTTXTAXCODE ]({ newRate }) {
		let activeProfile = Profiles.findOne()

		// Test module is enabled on profile.
		if (!activeProfile.isModuleEnabled('taxation')) {
			console.warn("Attempted top interact with disabled module")
			return
		}

		Profiles.update({ 
			_id: activeProfile._id,
			'modules.name': 'taxation' 
		}, {
			$push: {
				'modules.$.taxCodes.items': {
					_id: new Meteor.Collection.ObjectID().toHexString(),
					codeId:'',
					label:newRate.label,
					rate:newRate.rate


				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
	},


	/**
	 * Delete a user's tax type in their active profile.
	 * 
	 * @param {*} param0 
	 */
	[ methodTypes.PROFILE_MODULE_TAXATION_DELETETXTAXCODE ]({ _id }) {
		let activeProfile = Profiles.findOne()

		// Test module is enabled on profile.
		if (!activeProfile.isModuleEnabled('taxation')) {
			console.warn("Attempted top interact with disabled module")
			return
		}

		// Remove all transaction labels from the user profile corresponding
		// to this label type.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'taxation'
		}, {
			$pull: {
				'modules.$.processed': {
					labelTypeId: _id
				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })

		// Remove the label type.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'taxation'
		}, {
			$pull: {
				'modules.$.taxCodes.items': {
					_id
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
	[ methodTypes.PROFILE_MODULE_TAXATION_UPDATETAXCODE ]({ _id, label ,rate}) {
		// TODO: VALIDATION! of user vs profile.
		let activeProfile = Profiles.findOne();
		console.log(''+JSON.stringify(_id)+JSON.stringify(label)+JSON.stringify(rate))
        let codeId=''
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'taxation'
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
			'modules.name': 'taxation'
		}, {
			$push: {
				'modules.$.taxCodes.items': {
					_id,
					codeId,
					label,
					rate


				}
			}
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
	},





	/**
	 * Update a transaction's tagged tax code for the active profile.
	 * 
	 * @param {*} param0 
	 */
	[methodTypes.PROFILE_MODULE_TAXATION_UPDATETXTAXCODE] ({ transactionId, taxCodeId }) {
		let activeProfile = Profiles.findOne()

		if (!activeProfile.isModuleEnabled('taxation')) {
			console.warn('Attempted to interact with deactivated module')
			return
		}

		// Remove any "processed" entries for the target transaction.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'taxation'
		}, {
			$pull: {
				'modules.$.processed': {
					transactionId
				}
			},
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
		
		/**
		 * TODO: this should be decoupled through a simple RxJS message
		 * bus or equivalent instead of a hardcoded here.
		 */

		const entry = makeProcessedEntry(transactionId, taxCodeId)

		if (!entry)
			return

		// Push a new unprocessed entry ready to be computed by another
		// subsystem.
		Profiles.update({
			_id: activeProfile._id,
			'modules.name': 'taxation'
		}, {
			$push: {
				'modules.$.processed':  entry
			},
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		}, { bypassCollection2: true })
	}
})
