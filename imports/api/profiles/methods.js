import Profiles from '../../api/profiles/profiles'

Meteor.methods({

    /**
     * Insert a new labelType into the user's active profile.
     * 
     * @param {*Insert} param0 
     */
    'profiles.active.insert.labelType' ({name, gst}) {

        let currentProfile = Profiles.current();

        Profiles.update(currentProfile._id, {
            $push: {
                'labelTypes': {
                    // TODO: best way to do IDs?
                    _id: new Meteor.Collection.ObjectID().toHexString(),
                    name, 
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
    }
})