import { Meteor } from 'meteor/meteor'
import { Accounts as UserAccounts } from 'meteor/accounts-base'

import Profiles from '../profiles'
import * as methodTypes from './userMethodTypes'

const publicKeyValidator = /^[0-9a-f]{64}$/i

Meteor.methods({
    /**
     * Insert a new member and assign to the current user's active profile.
     * 
     * @param {*} param0 
     */
    [methodTypes.PROFILE_INSERT_USER]({ name, publicKey }){
        
        // TODO: can we abstract this for all relevant method calls?
        if (!Meteor.user()) {
            console.warn('Unknown user')
            return { error: 'You are not logged in' }
        }

        if (!publicKeyValidator.test(publicKey)) {
            console.warn('Invalid public key format')
            return
        }

        if (!name || name === '') {
            console.warn('Invalid user name')
            return
        }

        // Get current user's active profile. This is the only profile they can
        // currently add another user to.
        let profileId = Meteor.user().services['centrality-blockeeper'].profileId
        
        UserAccounts.updateOrCreateUserFromExternalService(
            'centrality-blockeeper', 
            { 
                // Meteor/accounts-base requirement.
                id: publicKey, 

                // Blockeeper specific information.
                publicKey, 
                name,
                profileId
            }
        )
    }
})