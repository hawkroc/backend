import { Meteor } from 'meteor/meteor'

import Profiles from '../../api/profiles/profiles'
import Accounts from '../../api/accounts/accounts'

import * as methodTypes from './moduleMethodTypes'

// TODO: decouple.
const makeProcessedEntry = (transactionId, taxCodeId) => {

    const module = Profiles.active().getModule('taxation')
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
     * Update a transaction's tagged tax code for the active profile.
     * 
     * @param {*} param0 
     */
    [methodTypes.PROFILE_MODULE_TAXATION_UPDATETXTAXCODE] ({ transactionId, taxCodeId }) {
        let activeProfile = Profiles.active()

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
