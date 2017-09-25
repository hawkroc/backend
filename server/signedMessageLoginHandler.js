import { Meteor } from 'meteor/meteor'
import { Accounts as UserAccounts } from 'meteor/accounts-base'

import * as Signing from 'ethereumjs-util'

const ecPartValidator = /^[0-9a-f]{64}$/i

/**
 * Register a 'signed-message' login handler for logging in users based
 * on a message signed by their private key cross referenced with our 
 * public keys in storage.
 * 
 * Uses an undocumented method. See meteor source-code on Github for details.
 *  https://github.com/meteor/meteor/blob/devel/packages/accounts-base/accounts_server.js
 * 
 */
export function register () {
    // Options when calling with Accounts.callLoginMethod on client:
    //
    // - methodName: The method to call (default ‘login’)
    // - methodArguments: The arguments for the method
    // - validateResult: If provided, will be called with the result of the
    //                 method. If it throws, the client will not be logged in (and
    //                 its error will be passed to the callback).
    // - userCallback: Will be called with no arguments once the user is fully
    //                 logged in, or with the error on error.
    //
    UserAccounts.registerLoginHandler(
        'signed-message',
        (ecSignedMessage, options) => {
            console.log("signedMessageLoginHandler: user attempting to log in...")

            if (!ecSignedMessage || !ecSignedMessage.v || !ecSignedMessage.r || !ecSignedMessage.v) {
                console.log("signedMessageLoginHandler: invalid EC signature arg structure { v, r, s }")
                return null
            }

            const { v, r, s } = ecSignedMessage

            if ((v != 27 && v != 28) || !ecPartValidator.test(r) || !ecPartValidator.test(s)) {
                console.log("signedMessageLoginHandler: invalid EC signature part")
                console.log("v:", v, "r:", r, "s:", s)
                return null
            }

            // Pull the public key from the signed message.
            const signaturePublicKey = Signing.ecrecover( 
                new Buffer(Meteor.settings.public.login_key, 'hex'),
                v, 
                new Buffer(r, 'hex'), 
                new Buffer(s, 'hex')
            )

            const trimmedPublicKey = signaturePublicKey.toString('hex').substr(0, 64)

            const user = UserAccounts.users.findOne({
                'services.centrality-blockeeper.publicKey': trimmedPublicKey
            })

            /**
             * The object returned from this function contains the users document _id
             * of the user we wish to log in. To not log in any user, specify an error
             * key or return null.
             * 
             */
            if (!user) {
                console.log("signedMessageLoginHandler: no user was identified with public key", trimmedPublicKey)
                return null
            }

            console.log("signedMessageLoginHandler: Successfully resolved user with _id ", user._id)

            return { userId: user._id }
        })
}