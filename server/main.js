import { Meteor } from 'meteor/meteor'

import * as appInsights from 'applicationinsights'

import databaseFixtures from './fixtures/databaseFixtures'
import publishCollections from '../imports/server/publishCollections'
import schedule from './schedule'

// Azure application insights init.
if (!!Meteor.settings.azure.app_insights_key) {
	console.log('Starting Azure application insights')
	appInsights.setup(Meteor.settings.azure.app_insights_key)
	appInsights.start()
} else {
	console.log('Azure application insights is disabled - no key found')
}

/**
 * Register all module meteor methods.
 */
import '../imports/modules/moduleMethods'

Meteor.startup(() => {
	console.log('Meteor server has started.')

	// Conditionally load the database fixtures.
	//  TODO: there should probably also be a dev/prod flag check for this.
	databaseFixtures.apply()
	// Publish our API collections for use client-side.
	publishCollections.apply()
	// Start the mining schedule for accessing transaction information.
	schedule.apply()
})
