import * as types from '../constants/actionTypes'
/**
 * Set available language.
 * @param {*} value
 *
 */
export const setLanguage = (value) => ({type: types.SET_LANGUAGE, value})
//timestamp: { from, to } 
export const setSearchBlock = (value) => ({type: types.SET_SEARCH_BLOCK, value})
