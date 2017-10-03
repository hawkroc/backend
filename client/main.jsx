import { Meteor } from 'meteor/meteor'
import { Accounts as UserAccounts } from 'meteor/accounts-base'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { message } from 'antd'

// Subscribe the client to all of our API collections.
import subscribeCollections from '../imports/client/subscribeCollections'

import './style.css'

import store from '../imports/redux/store'
import RootContainer from '../imports/ui/containers/rootContainer'


Meteor.startup(() => {
	subscribeCollections.apply()

	// Register a login failure handler.
	UserAccounts.onLoginFailure((e) => {
		/**
		 * There are two known cases for log-in.
		 * 	1. The login fails due to an unkown user key (error 500)
		 * 	2. The login fails due to an expired/deleted session token (error 403)
		 * 
		 * There are probably more cases that need to be handled but the documentation
		 * is lacking.
		 */
		
		if(e.error.error == 403) {
			message.info('Session timed out - please log-in again')
		} else {
			message.error('Unknown user key provided')
		}
	})

	render(
		<Provider store={store}>
			<RootContainer/>
		</Provider>,

		document.getElementById('react-root')
	)
})
