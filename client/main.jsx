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

	// Register a login failure handler. Our options for error messaging
	// are very limited here.
	UserAccounts.onLoginFailure(() => {
		message.error("Unknown user key provided")
	})

	render(
		<Provider store={store}>
			<RootContainer/>
		</Provider>,

		document.getElementById('react-root')
	)
})
