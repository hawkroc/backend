import { Meteor } from 'meteor/meteor'
import { Factory } from 'meteor/dburles:factory'

import faker from 'faker'

const createId = () => {
	return new Meteor.Collection.ObjectID().toHexString()
}

const createProfileFixture = () => ({
	_id: createId(),

	info: {
		_id: createId(),
		username: 'text-fixture@yinpeng.ai'
	},

	trackedAccounts: [ ],

	labelTypes: [
		{
			_id: createId(),
			name: 'Test fixture label 1',
			gst: false
		},
		{
			_id: createId(),
			name: 'Test fixture label 2',
			gst: true
		}
	],

	labels: [ ]
})

export const initializeFactory = (profilesCollection) => {
	// TODO: Once this PR is merged into dburles:factory, we can use
	// _id: () => createId() to generate new ids every call. For now
	// just override IDs on creation to avoid dup key errors.
	//      https://github.com/versolearning/meteor-factory/pull/28

	Factory.define('profile', profilesCollection, createProfileFixture())
	Factory.define('profile.2', profilesCollection, createProfileFixture())

	Factory.define('profile.with.trackedAccounts', profilesCollection,
		Factory.extend('profile', {
			trackedAccounts: [
				{
					_id: createId(),
					accountId: createId(),
					alias: faker.lorem.sentence()
				},
				{
					_id: createId(),
					accountId: createId(),
					alias: faker.lorem.sentence()
				}
			]
		})
	)
}
