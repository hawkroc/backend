import { Meteor } from 'meteor/meteor'
import { Accounts as UserAccounts } from 'meteor/accounts-base'

import Profiles from '../profiles'
import * as methodTypes from './userMethodTypes'

Meteor.methods({

    // Meteor.call('profiles.active.insert.user', { publicKey: '7afd49cb3065d4b6aa85e08ac35bbc30ccb353274c51bddd94346abffa8f816a', name: 'Tim' })
    [methodTypes.PROFILE_INSERT_USER]({ name, publicKey }){
        
        console.warn("MAKE USER ATTEMPTED")

        // if (!Meteor.user()) {
        //     console.warn("Unknown user")
        //     return { error: "You are not logged in" }
        // }

        // Get current user's active profile. This is the only profile they can
        // currently add another user to.
        let profileId = Profiles.findOne()._id
        

        UserAccounts.updateOrCreateUserFromExternalService(
            'centrality-blockeeper', 
            { 
                id: publicKey, 
                publicKey, 
                name,
                profileId
            }
        )
        //this.setUserId(thing.userId)
        //console.warn(thing)
    }
})