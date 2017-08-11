import Profiles from '../../api/profiles/profiles'

Meteor.methods({

    /**
     * Update a user's label type in their active profile.
     * 
     * @param {*} param0 
     */
    'profiles.active.update.labelType' ({_id, name, gst}) {
        // TODO: VALIDATION! of user vs profile.
        //let currentProfile = Profiles.current();
        
        Profiles.update(
            {
                'labelTypes._id': _id
            }, {
                $set: {
                    'labelTypes.$.name': name,
                    'labelTypes.$.gst': gst
                }
            }
        )
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
    }
})