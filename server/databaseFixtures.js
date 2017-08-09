import Accounts from '../imports/api/accounts/accounts'

/**
 * Contains an initial set of data for testing purposes.
 * 
 */
export default {
    apply: () => {
        Meteor.startup(() => { 

            // Don't add fixturs if we already have data.
            if (Accounts.find().count() !== 0) {
                console.log("databaseFixtures: Found existing data. Skip adding fixtures.")
                return;
            }

            console.log("databaseFixtures: No existing account data. Adding test fixtures.")

            let data = [
                {
                    address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
                    alias: 'Default account'
                }
            ]

            data.forEach((account) => {
                const whatsThis = Accounts.insert(account);
            })
        })
    }
}