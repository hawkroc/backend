import Accounts from '../../accounts/accounts';
import Users from '../../users/users';

/**
 * Serverside only - publish collections to clients.
 * 
 */
export default {
    apply: () => {
        Meteor.publish('accounts', () => {
            // Return all accounts for now.
            return Accounts.find({}, {
                fields: Accounts.publicFields
            })
        })
    }
}