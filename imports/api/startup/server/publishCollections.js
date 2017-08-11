import Accounts from '../../accounts/accounts';
import Profiles from '../../profiles/profiles';

/**
 * Serverside only - publish collections to clients.
 * 
 */
export default {
    apply: () => {
        Meteor.publish('accounts', () => {
            // Return all accounts for now.
            return Accounts.find({ }, {
                fields: Accounts.publicFields
            })
        })

        Meteor.publish('profiles', () => {
            // Return the first profile to the client only for now.
            // This will eventually be selected based on the logged in user.
            return Profiles.findOne({ }, {
                fields: Profiles.publicFields
            })
        })
    }
}