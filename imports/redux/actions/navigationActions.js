import * as types from '../constants/actionTypes'

/**
 * Set available language.
 * 
 * @param {*} value
 *
 */
export const setLanguage = (value) => ({
	type: types.NAVIGATION_LOCALE_CHANGED,
	value
})

/**
 * Set the transactions list timeseries filter.
 *  value: { from, to } 
 * 
 * @param {*} value 
 * 
 */
export const setTxTimestampFilter = (value) => ({
	type: types.NAVIGATION_TXFILTER_CHANGED,
	value
})
