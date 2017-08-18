import * as types from '../constants/actionTypes'
import {GetExchange} from '../../api/remoteDataSource/fetchJson'
/**
 * Set available accounts.
 * 
 * @param {Complete collection of accounts} value 
 */
export const setAccounts = (value) => ({
    type: types.SET_ACCOUNTS,
    value
})



export const setExchange = (value) => {

    return {type: types.SET_EXCHANGE, value}
}

export const getExchangeData = () => {

    return (dispatch) => {
        GetExchange().then((response) => {
     
            dispatch(setExchange(response.data.USD));
        })
    }

}