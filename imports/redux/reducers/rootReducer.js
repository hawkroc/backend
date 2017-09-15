import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import { combineReducers } from 'redux'
import store from '../store'

import accountsReducer from './accountsReducer'
import navigationReducer from './navigationReducer'
import profilesReducer from './profilesReducer'

import { setActiveProfile, setActiveCurrency } from '../actions/profileActions'
import { setAccounts } from '../actions/accountActions'

import Profiles from '../../api/profiles/profiles'
import Accounts from '../../api/accounts/accounts'
import ExchangeRates from '../../api/exchangeRates/exchangeRates'

/**
 * Root redux reducer provided to createStore.
 * 
 */
const rootReducer = combineReducers({
	accounts: accountsReducer,
	navigation: navigationReducer,
	profiles: profilesReducer
})

// Every change to the profile in question will trigger a dispatch.
// TODO: Set different current base on profiles
// TODO: need to test and make sure this doesn't fire when ANY profile changes.
Meteor.startup(() => {
	Tracker.autorun(() => {
		(
			store.dispatch(
				setActiveProfile(Profiles.active())
			),
			store.dispatch(
				setAccounts(Accounts.find().fetch())
			),
			store.dispatch(
				setActiveCurrency(ExchangeRates.active())
			))
	})
})

export default rootReducer
