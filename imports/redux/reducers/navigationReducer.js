import * as actions from '../actions/navigationActions'

const intialState = {
    /**
     * Is there currently a filter active over the transactions.
     */
    filterActive: false,

    /**
     * If filtering - the current timespan filter range.
     */
    filterTimespan: {
        from: 0,
        to: 0
    }
}

const reducer = (state = intialState, payload) => {
    switch (payload.type) {

        default:
            return state;
    }
};

export default reducer;