import * as types from '../constants/actionTypes'

/**
 * Set current user profile.
 * 
 * @param {*} value 
 */
export const setActiveProfile = (value) => ({
    type: types.SET_ACTIVE_PROFILE,
    value
})