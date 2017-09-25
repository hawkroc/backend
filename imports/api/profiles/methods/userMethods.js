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
    [methodTypes.PROFILE_INSERT_USER]({ name, publicKey }) {
        
        // TODO: can we abstract this for all relevant method calls?
        if (!Meteor.user()) {
            console.warn('Caller is not logged in')
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
        
        if (Meteor.isServer) {
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
    },

    /**
     * Delete a user from the current user's profile.
     * 
     * @param {*} param0 
     */
    [methodTypes.PROFILE_DELETE_USER]({ userId }) {
        // TODO: can we abstract this for all relevant method calls?
        if (!Meteor.user()) {
            console.warn('Caller is not logged in')
            return { error: 'You are not logged in' }
        }

        // Ensure the target user and current user share the same active profile.
        let targetUser = UserAccounts.users.findOne(userId)

        if (!targetUser 
            || targetUser.services['centrality-blockeeper'].profileId
                !== Meteor.user().services['centrality-blockeeper'].profileId
        ) {
            console.warn('Unknown target user')
            return { error: 'Attempted to delete unkown user' }
        }

        // Ensure that the current user is not deleting themselves...
        if (targetUser._id === Meteor.userId()) {
            console.warn('User cannot delete themselves')
            return { error: 'Can not delete self' }
        }

        // Delete the whole user document. This should log the user out.
        UserAccounts.users.remove({
            _id: userId
        })
    }
})