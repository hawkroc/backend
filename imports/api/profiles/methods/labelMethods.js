import * as methodTypes from './labelMethodTypes' 

import Profiles from '../../../api/profiles/profiles'
import Accounts from '../../../api/accounts/accounts'

Meteor.methods({

    /**
     * Insert a new labelType into the user's active profile.
     * 
     * @param {*Insert} param0 
     */
    [methodTypes.PROFILE_INSERT_LABELTYPE] ({name, gst}) {

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
    [methodTypes.PROFILE_UPDATE_LABELTYPE] ({_id, name, gst}) {
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
    [methodTypes.PROFILE_DELETE_LABELTYPE] ({ _id }) {
        let activeProfile = Profiles.active();

        // Remove all transaction labels from the user profile corresponding
        // to this label type.
        Profiles.update({
                _id: activeProfile._id,
                'labels.labelTypeId': _id
            }, {
                $pull: {
                    'labels': {
                        labelTypeId: _id
                    }
            }
        })

        // Remove the label type.
        Profiles.update(activeProfile._id, {
            $pull: {
                'labelTypes': { _id }
            }
        })
    },

    /**
     * Update the active user's label for a transaction.
     * 
     * @param {*} param0 
     */
    [methodTypes.PROFILE_UPDATE_LABEL] ({txId, labelTypeId}) {
        let activeProfile = Profiles.active();

        // Pull all exising labels for provided transaction ID.
        Profiles.update({
                _id: activeProfile._id,
                'labels.transactionId': txId
            }, {
            $pull: {
                'labels': { 
                    transactionId: txId
                 }
            },
        })

        // Push the new label against the account/transaction.
        Profiles.update({
                _id: activeProfile._id
            }, {
            $push: {
                'labels': { 
                    transactionId: txId,
                    labelTypeId
                 }
            },
        })
    }
})