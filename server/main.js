import { Meteor } from 'meteor/meteor'

import databaseFixtures from './databaseFixtures'
import publishCollections from '../imports/api/startup/server/publishCollections'
import scheduleCronstyle from './schedule'
Meteor.startup(() => {
	console.log('Meteor server has started.')
	// Conditionally load the database fixtures.
	//  TODO: there should probably also be a dev/prod flag check for this.
	databaseFixtures.apply()
	// Publish our API collections for use client-side.
	publishCollections.apply()
	// Start the mining schedule for accessing transaction information.
	scheduleCronstyle
})
