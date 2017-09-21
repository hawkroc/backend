import { Meteor } from 'meteor/meteor'
import { Accounts as UserAccounts } from 'meteor/accounts-base'

import * as Signing from 'ethereumjs-util'

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
        ({ signedEcMessage }, options) => {

            console.log("signedMessageLoginHandler: user attempting to log in...")

            const { v, s, r } = signedEcMessage

            // Pull the public key from the signed message.
            const signaturePublicKey = Signing.ecrecover( 
                new Buffer(Meteor.settings.public.login_key, 'hex'),
                v, r, s
            )

            const user = UserAccounts.users.findOne({
                'services.centrality-blockeeper.publicKey': 
                    signaturePublicKey.toString('hex').subStr(0, 64)
            })

            console.log(user)

            /**
             * The object returned from this function contains the users document _id
             * of the user we wish to log in. To not log in any user, specify an error
             * key or return null.
             * 
             */
            if (!user) {
                return null
            }

            return { userId: user.id }
        })
}