import * as actionTypes from '../constants/actionTypes'
import * as actions from '../actions/accountActions'

const initialState = {
    /**
     * Collection of configured accounts.
     * 
     */
    items: [
        {
            name: 'Default account',
            address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
            balance: '$0.00'
        }
    ]
}

const reducer = (state = initialState, payload) => {
    switch (payload.type) {
        case actionTypes.SET_ACCOUNT:
            //return [...state, payload.item];

        default:
            return state;
    }
};

export default reducer