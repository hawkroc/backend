import { Accounts as UserAccounts } from 'meteor/accounts-base'

import Profiles from '../../../../imports/api/profiles/profiles'

export default {
	generate: () => {
        const publicKey = '7afd49cb3065d4b6aa85e08ac35bbc30ccb353274c51bddd94346abffa8f816a'

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
