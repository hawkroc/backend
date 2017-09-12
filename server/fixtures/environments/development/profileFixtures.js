import { Meteor } from 'meteor/meteor'

import Accounts from '../../../../imports/api/accounts/accounts'

export default {
	generate: () => {
		// Add every existing account as a tracked account.
		const trackedAccounts = Accounts.find().fetch().map((a, i) => (
			{
				_id: new Meteor.Collection.ObjectID().toHexString(),
				accountId: a._id,
				alias: `Demo account ${i+1}`
			}
		))

		let fixtures = [
			{
				info: {
					_id: new Meteor.Collection.ObjectID().toHexString(),
					username: 'demo-user@centrality.ai'
				},

				trackedAccounts,

				transactionDataTypes: {
					gstLabels: {
						name: "gst-labels",
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
