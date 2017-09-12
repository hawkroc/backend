import { Meteor } from 'meteor/meteor'

import Accounts from '../../../../imports/api/accounts/accounts'

export default {
	generate: () => {
		// Add every existing account as a tracked account.
		const trackedAccounts = Accounts.find().fetch().map((a, i) => (
			{
				_id: new Meteor.Collection.ObjectID().toHexString(),
				accountId: a._id,
				alias: `Demo account ${i}`
			}
		))

		let fixtures = [
			{
				info: {
					_id: new Meteor.Collection.ObjectID().toHexString(),
					username: 'demo-user@centrality.ai'
				},

				trackedAccounts,

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

		return fixtures
	}
}
