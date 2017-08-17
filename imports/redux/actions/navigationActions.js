import * as types from '../constants/actionTypes'
import {GetExchange} from '../../api/remoteDataSource/fetchJson'
/**
 * Set available language.
 * @param {*} value
 *
 */
export const setLanguage = (value) => ({type: types.SET_LANGUAGE, value})

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