import * as types from '../constants/actionTypes'

/**
 * Set available accounts.
 * 
 * @param {Complete collection of accounts} value 
 */
export const setAccounts = (value) => ({
    type: types.SET_ACCOUNTS,
    value
})