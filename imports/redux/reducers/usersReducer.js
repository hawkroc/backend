import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import * as actionTypes from '../constants/actionTypes'

/**
 * Handles state changes for user related information.
 * 
 */

const initialState = {
	items: null
}

const reducer = (state = initialState, payload) => {
	switch (payload.type) {
        case actionTypes.USERS_RECEIVED:
            return Object.assign({}, state, { items: payload.value })
        
		default:
			return state
	}
}

export default reducer
