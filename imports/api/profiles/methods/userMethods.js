import { Meteor } from 'meteor/meteor'

import * as methodTypes from './userMethodTypes'

Meteor.methods({

    [methodTypes.PROFILE_INSERT_USER]({ name, publicKey }){
        
        console.warn("MAKE USER ATTEMPTED")

        // if (!Meteor.user()) {
        //     console.warn("Unknown user")
        //     return { error: "You are not logged in" }
        // }

        

        Accounts.updateOrCreateUserFromExternalService(
            'centrality-blockeeper', 
            { id: publicKey, publicKey, name }
        )
        //this.setUserId(thing.userId)
        //console.warn(thing)
    }
})