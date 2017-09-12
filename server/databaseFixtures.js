import { Meteor } from 'meteor/meteor'

import Accounts from '../imports/api/accounts/accounts'
import Profiles from '../imports/api/profiles/profiles'
import ExchangeRates from '../imports/api/exchangeRates/exchangeRates'

/**
 * Pushes an initial set of data collections for testing purposes.
 * 
 * Keep these up to date with the relevant schemas.
 * 
 */

const pushProfileFixtures = () => {
	// Don't add fixtures if we already have data.
	if (Profiles.find().count() !== 0) {
		console.log('databaseFixtures: Found existing PROFILE data. No PROFILE fixtures added.')
		return
	}

	console.log('databaseFixtures: No existing PROFILE data. Adding test fixtures.')

	let data = [
		{
			info: {
				_id: new Meteor.Collection.ObjectID().toHexString(),
				username: 'demo-user@centrality.ai'
			},

			trackedAccounts: [
				{
					_id: new Meteor.Collection.ObjectID().toHexString(),
					accountId: Accounts.findOne()._id,
					alias: 'Demo account'
				}
			],

			labelTypes: [
				{
					_id: new Meteor.Collection.ObjectID().toHexString(),
					name: 'Staff salary',
					gst: false
				},
				{
					_id: new Meteor.Collection.ObjectID().toHexString(),
					name: 'Travel expense',
					gst: true
				},
				{
					_id: new Meteor.Collection.ObjectID().toHexString(),
					name: 'Rent',
					gst: true
				}
			],

			labels: [ ]
		},
	]

	data.forEach((profile) => {
		Profiles.insert(profile)
	})
}

const pushAccountFixtures = () => {
	// Don't add fixtures if we already have data.
	if (Accounts.find().count() !== 0) {
		console.log('databaseFixtures: Found existing ACCOUNT data. No ACCOUNT fixtures added.')
		return []
	}

	console.log('databaseFixtures: No existing ACCOUNT data. Adding test fixtures.')

	let data = [
		{
			address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
			transactions: [],
			latestMinedBlock: 0,
			balance: 0
		}
	]

	data.forEach((account) => {
		Accounts.insert(account)
	})
}


const pushExchangeRatesFixtures = () => {
	// Don't add fixtures if we already have data.
	if (ExchangeRates.find().count() !== 0) {
		console.log('databaseFixtures: Found existing ExchangeRates data. No ExchangeRates fixtures added.')
		return []
	}

	console.log('databaseFixtures: No existing ExchangeRates data. Adding test fixtures.')

	let data = [
		{
			digitalCurrency: 'ETH',
			fiatCurrency: 'USD',
			latestMinedDate: 0,
			// this hard code only for test before synchronize ExchangeRates from api
			rates: []
		},
		{
			digitalCurrency: 'BTC',
			fiatCurrency: 'USD',
			latestMinedDate: 0,
			// this hard code only for test before synchronize ExchangeRates from api
			rates: []
		}
	]

	data.forEach((exchangeRate) => {
		ExchangeRates.insert(exchangeRate)
	})
}


export default {
	apply: () => {
		Meteor.startup(() => {
			pushAccountFixtures()
			pushProfileFixtures()
			pushExchangeRatesFixtures()
		})
	}
}
