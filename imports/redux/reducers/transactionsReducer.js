import * as actionTypes from '../constants/actionTypes'
import * as actions from '../actions/transactionActions'

const initialState = {
    /**
     * Collection of collected transactions - probably from remote API source.
     * 
     */
    items: [ ]
}

const reducer = (state = initialState, payload) => {
    switch (payload.type) {
        case actionTypes.SET_ACCOUNT:
            //return [...state, payload.item];

        default:
            return state;
    }
}

export default reducer