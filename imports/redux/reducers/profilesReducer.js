import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import store from '../store'
import * as actionTypes from '../constants/actionTypes'
import { setActiveProfile } from '../actions/profileActions'
import { setActiveCurrency } from '../actions/profileActions'
import {setAccounts} from '../actions/accountActions'
import Profiles from '../../api/profiles/profiles'
import Accounts from '../../api/accounts/accounts'
import Currencies from '../../api/currency/currency'

/**
 * Handles state changes for profile related information.
 * 
 */

const initialState = {
	// The currently active user profile. For structure, see profileSchema.js.
	active: null,

	currencies: null,
}

const reducer = (state = initialState, payload) => {
	switch (payload.type) {
		case actionTypes.PROFILES_ACTIVE_RECEIVED:
			return Object.assign({ }, state, { active: payload.value })
		case actionTypes.CURRENCY_ACTIVE_RECEIVED:
			return  Object.assign({ }, state, { currencies: payload.value })
		default:
			return state
	}
}

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
				setAccounts(Accounts.active())
			),

			store.dispatch(
				setActiveCurrency(Currencies.active())
			)
		)
	})
})

export default reducer
