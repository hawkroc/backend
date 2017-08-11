import Profiles from '../../../api/profiles/profiles'
import Accounts from '../../../api/accounts/accounts'

Meteor.methods({

    /**
     * Insert a new tracked account into a user's active profile.
     * 
     * @param {*} param0 
     */
    'profiles.active.insert.trackedAccount' ({ alias, address }) {
        // TODO: VALIDATION! of user vs profile.
        // TODO: address validation!
        // TODO: user collection factories!
        let currentProfile = Profiles.current();

        // If the user is tracking an account that does not yet exist in our system,
        // create it.
        let account = Accounts.findOne({ address });
        let accountId = null;

        if (!account) {
            accountId = Accounts.insert({
                address,
                transactions: [ ],
                latestMinedBlock: 0
            })
        } else {
            accountId = account._id
        }

        Profiles.update(currentProfile._id, {
            $push: {
                'trackedAccounts': {
                    // TODO: best way to do IDs?
                    _id: new Meteor.Collection.ObjectID().toHexString(),
                    alias, 
                    accountId,
                    labels: [ ]
                }
            }
        })
    },

    /**
     * Update a user's tracked account in their active profile.
     * 
     * @param {*} param0 
     */
    'profiles.active.update.trackedAccount' ({_id, alias, accountId}) {
        // TODO: VALIDATION! of user vs profile.

        // Accounts.insert({
        //    address: updatedAccount.address,
        //    ...
        // })

        Profiles.update(
            {
                'trackedAccounts._id': _id
            }, {
                $set: {
                    'trackedAccounts.$.alias': alias,
                    'trackedAccounts.$.accountId': accountId
                }
            }
        )
    },

    /**
     * Delete a user's tracked account type in their active profile.
     * 
     * @param {*} param0 
     */
    'profiles.active.delete.trackedAccount' ({ _id }) {
        let currentProfile = Profiles.current()

        let toDelete = currentProfile.trackedAccounts
            .find(ta => ta._id === _id);

        if (toDelete) {
            // Delete.
            Profiles.update(currentProfile._id, {
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