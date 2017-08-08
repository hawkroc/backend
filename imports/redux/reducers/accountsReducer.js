import * as actions from '../actions/accountActions'

const reducer = (state = [], payload) => {
    switch (payload.type) {
        case actions.SET_ACCOUNT:
            //return [...state, payload.item];
        default:
            return state;
    }
};

export default reducer;