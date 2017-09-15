import { Meteor } from 'meteor/meteor'

/**
 * Client only - subscribe to published collections.
 * 
 */
export default {
	apply: () => {
		Meteor.subscribe('accounts')
		Meteor.subscribe('profiles')
		Meteor.subscribe('exchangeRates')
	}
}
