import Accounts from '../../accounts/accounts';

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