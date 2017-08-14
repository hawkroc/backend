import { Tracker } from 'meteor/tracker'

import store from '../store'
import * as actionTypes from '../constants/actionTypes'
import { setAccounts } from '../actions/accountActions'

import Accounts from '../../api/accounts/accounts'


const initialState = {
    /**
     * Collection of configured accounts.
     * 
     */
    items: [ ]
}

const reducer = (state = initialState, payload) => {
    switch (payload.type) {
        case actionTypes.SET_ACCOUNTS:
            return Object.assign({}, state, { items: payload.value })

        default:
            return state;
    }
};

// Every change to the accounts collection will trigger a dispatch.
Meteor.startup(() => {
    Tracker.autorun(() => {
        store.dispatch(
            setAccounts(Accounts.find().fetch())
        )
    })
})

export default reducer