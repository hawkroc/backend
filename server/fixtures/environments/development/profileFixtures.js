import { Meteor } from 'meteor/meteor'

import Accounts from '../../../../imports/api/accounts/accounts'

export default {
	generate: () => {
		// Add every existing account as a tracked account.
		const trackedAccounts = Accounts.find().fetch().map((a, i) => (
			{
				_id: new Meteor.Collection.ObjectID().toHexString(),
				accountAddress: a.address,
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
						name: "transaction-labelling",
						metadata: {
							version: "basic-1.0-alpha",
							enabled: true,
							dependencies: [ ]
						},

						labelTypes: {
							items: [
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Abschluss'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Accruals'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Accruals & reserves'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Accumulated profit'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Administration costs'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Advertising expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Assets'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Balance'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Cash and Bank'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Cash ETH'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Costs'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Current Assets'
								},




								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Depreciation'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Depts'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Extraordinary income'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Extraordinary income/expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Fiinancial costs'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Financial expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Financial income'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Fixed Assets'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Income'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Income Statement'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Intercompany Expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Liabilities'
								},





								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Marketing expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Miscellaneous costs'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Non periode income/expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Not paid up share capital'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Operating expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Other current receivables'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Other liabilitie'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Other Operating expenses'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Participation'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Personnel costs'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'PROFIT/LOSS'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Receivables'
								},


								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Repairs & Maintenance'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Reserves'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Share capital'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Shareholder equity'
								},

								
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Short-term liabilities'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Tangible fixed Assets'
								},
								{
									_id: new Meteor.Collection.ObjectID().toHexString(),
									label: 'Taxes'
								}

							]
						},

						labelled: [ ]
					},
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

						processed: [ ]
					}
				]
			},
		]

		return fixtures
	}
}
