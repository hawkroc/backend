import * as actions from '../actions/navigationActions'
import * as actionTypes from '../constants/actionTypes'
import enUS from 'antd/lib/locale-provider/en_US'
const initialState = {
    /**
     * Is there currently a filter active over the transactions.
     */
    filterActive: false,
    language: enUS,

    /**
     * If filtering - the current timespan filter range.
     */
    filterTimespan: {
        from: 0,
        to: 0
    }
}

const reducer = (state = initialState, payload) => {
    switch (payload.type) {
        case actionTypes.SET_LANGUAGE:
            return Object.assign({}, state, {language: payload.value})
        case actionTypes.SET_SEARCH_BLOCK:
            return Object.assign({}, state, {filterTimespan: payload.value})
        default:

            return state;
    }
};

export default reducer