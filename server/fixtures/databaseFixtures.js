import { Meteor } from 'meteor/meteor'

const { fixtures_environment } = Meteor.settings.database

import devProfileFixtures from "./environments/development/profileFixtures"
import devAccountFixtures from "./environments/development/accountFixtures"
import devExchangeRateFixtures from "./environments/development/exchangeRateFixtures"

import Accounts from '../../imports/api/accounts/accounts'
import Profiles from '../../imports/api/profiles/profiles'
import Currency from '../../imports/api/currency/currency'


const pushProfileFixtures = () => {
	if (Profiles.find().count() !== 0) {
		console.log('databaseFixtures: Found existing PROFILE data. No PROFILE fixtures added.')
		return
	}

	console.log('databaseFixtures: No existing PROFILE data. Adding test fixtures.')

	devProfileFixtures.generate().forEach(p => {
		Profiles.insert(p)
	})
}

const pushAccountFixtures = () => {
	if (Accounts.find().count() !== 0) {
		console.log('databaseFixtures: Found existing ACCOUNT data. No ACCOUNT fixtures added.')
		return []
	}

	console.log('databaseFixtures: No existing ACCOUNT data. Adding test fixtures.')

	devAccountFixtures.generate().forEach(a => {
		Accounts.insert(a)
	})
}

const pushExchangeRateFixtures = () => {
	if (Currency.find().count() !== 0) {
		console.log('databaseFixtures: Found existing Currency data. No Currency fixtures added.')
		return []
	}

	console.log('databaseFixtures: No existing Currency data. Adding test fixtures.')

	devExchangeRateFixtures.generate().forEach(er => {
		Currency.insert(er)
	})
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

			if (!!fixtures_environment && fixtures_environment === 'development') {
				pushAccountFixtures()
				pushProfileFixtures()
				pushExchangeRateFixtures()
			} else {
				console.warn("databaseFixtures: No fixtures configured for environment.")
			}
		})
	}
}
