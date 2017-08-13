import Profiles from '../../../api/profiles/profiles'

Meteor.methods({

    /**
     * Insert a new labelType into the user's active profile.
     * 
     * @param {*Insert} param0 
     */
    'profiles.active.insert.labelType' ({name, gst}) {

        let activeProfile = Profiles.active();

        Profiles.update(activeProfile._id, {
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
        //let activeProfile = Profiles.active();
        
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
        let activeProfile = Profiles.active();

        // TODO: remove all transaction labels from the user profile corresponding
        // to this label type.

        Profiles.update(activeProfile._id, {
            $pull: {
                'labelTypes': { _id }
            }
        })
    }
})