import * as types from '../constants/actionTypes'
import {GetBalance} from '../../api/remoteDataSource/fetchJson'

/**
 * Set current user profile.
 *
 * @param {*} value
 */
export const setActiveProfile = (value) => ({type: types.PROFILES_ACTIVE_RECEIVED, value})

export const setActiveBalance = (value) => ({type: types.PROFILES_BALANCE_RECEIVED, value})

export const fetchEtherBalance = (value, trackedAccounts, accountsItems) => {
    return (dispatch) => {

        value = getIdToAddressBalance(trackedAccounts, accountsItems);
        return  dispatch(setActiveBalance(value));
    }
}

const getIdToAddressBalance = (trackedAccounts, items) => {
    let idToAddressBalance = [];
    for (let trackedAccount of trackedAccounts) {
        for (let item of items) {
            if (item._id === trackedAccount.accountId) {
                idToAddressBalance.push({id: trackedAccount.accountId, address: item.address, balance: item.balance})
                break;
            }
        }
    }

    return idToAddressBalance;
}
