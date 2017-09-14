import * as actionTypes from '../constants/actionTypes'

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

export default reducer
