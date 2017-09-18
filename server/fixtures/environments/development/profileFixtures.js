import { Meteor } from 'meteor/meteor'

import Accounts from '../../../../imports/api/accounts/accounts'

export default {
	generate: () => {
		// Add every existing account as a tracked account.
		const trackedAccounts = Accounts.find().fetch().map((a, i) => (
			{
				_id: new Meteor.Collection.ObjectID().toHexString(),
				accountId: a._id,
				alias: `Demo account ${i + 1}`
			}
		))

		let fixtures = [
			{
				info: {
					_id: new Meteor.Collection.ObjectID().toHexString(),
					username: 'demo-user@centrality.ai'
				},

				trackedAccounts,

				modules: [
					{
						name: "taxation",
						metadata: {
							version: "swiss-vat-1.0-alpha",
							enabled: true,
							dependencies: [ ]
						},
						
						taxCodes: {
							items: [
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									codeId: 'S',
									label: 'Standard (8.0%)',
									rate: 0.08
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									codeId: 'F',
									label: 'Foodstuffs (2.5%)',
									rate: 0.025
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									codeId: 'H',
									label: 'Hotels (3.8%)',
									rate: 0.038
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									codeId: 'Z',
									label: 'Exempt (0.0%)',
									rate: 0.0
								},
							]
						},

						processed: [

						]
					}
				],

				transactionDataTypes: {
					gstLabels: {
						name: 'gst-labels',
						items: [
							{
								_id: new Meteor.Collection.ObjectID().toHexString(),
								label: 'Staff salary',
								gst: false
							},
							{
								_id: new Meteor.Collection.ObjectID().toHexString(),
								label: 'Travel expense',
								gst: true
							},
							{
								_id: new Meteor.Collection.ObjectID().toHexString(),
								label: 'Rent',
								gst: true
							}
						]
					}
				},

				transactionData: [ ]
			},
		]

		return fixtures
	}
}
