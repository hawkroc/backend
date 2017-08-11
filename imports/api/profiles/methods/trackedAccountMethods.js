import Profiles from '../../../api/profiles/profiles'

Meteor.methods({

    /**
     * Insert a new tracked account into a user's active profile.
     * 
     * @param {*} param0 
     */
    'profiles.active.insert.trackedAccount' ({ alias, address }) {
        // TODO: VALIDATION! of user vs profile.
        let currentProfile = Profiles.current();

        // TODO: push new account into Accounts collection for mining.

        Profiles.update(currentProfile._id, {
            $push: {
                'trackedAccounts': {
                    // TODO: best way to do IDs?
                    _id: new Meteor.Collection.ObjectID().toHexString(),
                    alias, 
                    accountId: "TEST ACCOUNT ID",
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

        // TODO: if the referenced account isn't available in our system,
        // we need to add it and start scraping for its transactions.

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
        let currentProfile = Profiles.current();

        // TODO: if this is the last user tracking an account in our Accounts collection,
        // remove the account from the collection also.

        Profiles.update(currentProfile._id, {
            $pull: {
                'trackedAccounts': { _id }
            }
        })
    },
})