import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import * as actionTypes from '../constants/actionTypes'

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

export default reducer
