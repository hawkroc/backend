import { Accounts as UserAccounts } from 'meteor/accounts-base'

import Profiles from '../../../../imports/api/profiles/profiles'

export default {
	generate: () => {
		//use address instead of public key
        const publicKey = '6acddc01dad16218f6a22872149bf31cc13f7a64'

        // TODO: assumes at least one profile has been correctly added.
        const profileId = Profiles.findOne()._id

        // Add a single Centrality base user so we can log-in straight away.
        UserAccounts.updateOrCreateUserFromExternalService(
            'centrality-blockeeper', 
            { 
                id: publicKey, 
                publicKey, 
                name: "Centrality admin",
                profileId
            }
        )
	}
}
