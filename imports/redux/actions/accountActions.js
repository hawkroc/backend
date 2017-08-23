import * as types from '../constants/actionTypes'
import { GetExchange } from '../../api/remoteDataSource/fetchJson'

/**
 * Set available accounts.
 * 
 * @param {Complete collection of accounts} value 
 * 
 */
export const setAccounts = (value) => ({
    type: types.ACCOUNTS_RECEIVED,
    value
})

export const setEtherExchangeRate = (value) => ({
    type: types.ACCOUNTS_EXCHANGERATE_RECEIVED, 
    value
})

export const fetchEtherExchangeRate = () => {
    return (dispatch) => {
        GetExchange().then((response) => {
            dispatch(setEtherExchangeRate(response.data.USD));
        })
    }
}