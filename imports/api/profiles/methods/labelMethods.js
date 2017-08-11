import Profiles from '../../../api/profiles/profiles'

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

    /**
     * Delete a user's label type in their active profile.
     * 
     * @param {*} param0 
     */
    'profiles.active.delete.labelType' ({ _id }) {
        let currentProfile = Profiles.current();

        // TODO: remove all transaction labels from the user profile corresponding
        // to this label type.

        Profiles.update(currentProfile._id, {
            $pull: {
                'labelTypes': { _id }
            }
        })
    }
})