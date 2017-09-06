import * as types from '../constants/actionTypes'

/**
 * Set current user profile.
 *
 * @param {*} value
 */
export const setActiveProfile = (value) => ({ type: types.PROFILES_ACTIVE_RECEIVED, value })
export const setActiveCurrency = (value) => ({
	type: types.CURRENCY_ACTIVE_RECEIVED,
	value
})

