import { Meteor } from 'meteor/meteor'

import Accounts from '../imports/api/accounts/accounts'
import Profiles from '../imports/api/profiles/profiles'
import Currency from '../imports/api/currency/currency'

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


const pushCurrencyFixtures = () => {
	// Don't add fixtures if we already have data.
	if (Currency.find().count() !== 0) {
		console.log('databaseFixtures: Found existing Currency data. No Currency fixtures added.')
		return []
	}

	console.log('databaseFixtures: No existing Currency data. Adding test fixtures.')

	let data = [
		{
			bitCoin: 'ETH',
			fiatCurrency: 'USD',
			latestDate: 0,
			// this hard code only for test before synchronize currency from api
			hisCurrency: [
				{
					'high': 390.05,
					'average': 379.65,
					'time': Date.parse(new Date('2017-08-20 00:00:00')),
					'open': 372.04,
					'low': 367.60,
					'volume': 565192.00746302
				},
				{
					'high': 374.90,
					'average': 360.77,
					'time': Date.parse(new Date('2017-08-16 00:00:00')),
					'open': 347.68,
					'low': 347.68,
					'volume': 586027.29686727
				},
				{
					'high': 349.97,
					'average': 343.55,
					'time': Date.parse(new Date('2017-08-15 00:00:00')),
					'open': 347.92,
					'low': 336.38,
					'volume': 392176.46916394
				},
				{
					'high': 347.92,
					'average': 336.50,
					'time': Date.parse(new Date('2017-08-03 00:00:00')),
					'open': 332.77,
					'low': 332.77,
					'volume': 275313.68714527
				}]
		}
	]

	data.forEach((currency) => {
		Currency.insert(currency)
	})
}


export default {
	apply: () => {
		Meteor.startup(() => {
			pushAccountFixtures()
			pushProfileFixtures()
			pushCurrencyFixtures()
		})
	}
}
