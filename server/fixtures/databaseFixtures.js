import { Meteor } from 'meteor/meteor'

const { fixtures_environment, drop_collections_on_startup } = Meteor.settings.database

import devProfileFixtures from './environments/development/profileFixtures'
import devAccountFixtures from './environments/development/accountFixtures'
import devExchangeRateFixtures from './environments/development/exchangeRateFixtures'
import devUserFixtures from './environments/development/userFixtures'

import Accounts from '../../imports/api/accounts/accounts'
import Profiles from '../../imports/api/profiles/profiles'
import ExchangeRates from '../../imports/api/exchangeRates/exchangeRates'
import { Accounts as UserAccounts } from 'meteor/accounts-base'


const pushProfileFixtures = () => {
	if (Profiles.find().count() !== 0) {
		console.log('databaseFixtures: Found existing PROFILE data. No PROFILE fixtures added.')
		return
	}

	console.log('databaseFixtures: No existing PROFILE data. Adding test fixtures.')

	devProfileFixtures.generate().forEach(p => {
		// TODO: once bug is fixed, remove bypass flag.
		// https://github.com/aldeed/node-simple-schema/issues/112
		Profiles.insert(p, { bypassCollection2: true })
	})
}

const pushAccountFixtures = () => {
	if (Accounts.find().count() !== 0) {
		console.log('databaseFixtures: Found existing ACCOUNT data. No ACCOUNT fixtures added.')
		return
	}

	console.log('databaseFixtures: No existing ACCOUNT data. Adding test fixtures.')

	devAccountFixtures.generate().forEach(a => {
		Accounts.insert(a)
	})
}

const pushExchangeRateFixtures = () => {
	if (ExchangeRates.find().count() !== 0) {
		console.log('databaseFixtures: Found existing ExchangeRates data. No ExchangeRates fixtures added.')
		return
	}

	console.log('databaseFixtures: No existing ExchangeRates data. Adding test fixtures.')

	devExchangeRateFixtures.generate().forEach(er => {
		ExchangeRates.insert(er)
	})
}

const pushUserFixtures = () => {
	if (UserAccounts.users.find().count() !== 0) {
		console.log('databaseFixtures: Found existing Users data. No User fixtures added.')
		return
	}

	console.log('databaseFixtures: No existing Users data. Adding test fixtures.')
	devUserFixtures.generate()
}

/**
 * Pushes an initial set of data collections for testing purposes.
 * 
 * Keep these up to date with the relevant schemas.
 * 
 */
export default {
	apply: () => {
		Meteor.startup(() => {
			if (fixtures_environment === 'development') {
				// TODO: should this be done in-app or in the pipeline?
				if (!!drop_collections_on_startup) {
					// Remove ALL collections.
					console.warn('drop_collections_on_startup flag is set - dropping ALL database collections')

					// Manually drop each collection here.
					Profiles.rawCollection().drop()
					UserAccounts.users.rawCollection().drop()
					Accounts.rawCollection().drop()
					ExchangeRates.rawCollection().drop()
				}

				pushAccountFixtures()
				pushProfileFixtures()
				pushExchangeRateFixtures()
				pushUserFixtures()
			} else {
				console.warn('databaseFixtures: No fixtures configured for environment.')
			}
		})
	}
}
