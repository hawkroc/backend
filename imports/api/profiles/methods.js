import Profiles from '../../api/profiles/profiles'

Meteor.methods({

    /**
     * Update the user's current profile's labelType.
     * 
     * @param {*} param0 
     */
    'profiles.current.update.labelType' ({_id, name, gst}) {
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
    }
})