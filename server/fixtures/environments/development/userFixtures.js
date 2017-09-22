import { Accounts as UserAccounts } from 'meteor/accounts-base'

export default {
	generate: () => {
        const publicKey = '7afd49cb3065d4b6aa85e08ac35bbc30ccb353274c51bddd94346abffa8f816a'

        // Add a single Centrality base user so we can log-in straight away.
        UserAccounts.updateOrCreateUserFromExternalService(
            'centrality-blockeeper', 
            { id: publicKey, publicKey, name: "Centrality admin" }
        )
	}
}
