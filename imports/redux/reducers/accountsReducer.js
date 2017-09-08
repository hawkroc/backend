import { Meteor } from 'meteor/meteor'

import { Tracker } from 'meteor/tracker'

import store from '../store'
import * as actionTypes from '../constants/actionTypes'
import { setAccounts } from '../actions/accountActions'

import Accounts from '../../api/accounts/accounts'

const initialState = {
	/**
     * Collection of configured accounts.
     *
     */
	items: [],
	usdExchangeRate: 0, // the default rate is 0
}

const reducer = (state = initialState, payload) => {
	switch (payload.type) {
		case actionTypes.ACCOUNTS_RECEIVED:
			return Object.assign({}, state, { items: payload.value })
		case actionTypes.ACCOUNTS_EXCHANGERATE_RECEIVED:
			return Object.assign({}, state, { usdExchangeRate: payload.value })
		default:
			return state
	}
}

// Every change to the accounts collection will trigger a dispatch.
Meteor.startup(() => {
	Tracker.autorun(() => {
		return 	store.dispatch(setAccounts(Accounts.active()))
	})
})

export default reducer
