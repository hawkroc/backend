import { Tracker } from 'meteor/tracker'

import store from '../store'
import * as actionTypes from '../constants/actionTypes'
import { setActiveProfile } from '../actions/profileActions'

import Profiles from '../../api/profiles/profiles'

/**
 * Handles state changes for profile related information.
 * 
 */

const initialState = {
    // The currently active user profile. For structure, see profileSchema.js.
    active: null
}

const reducer = (state = initialState, payload) => {
    switch (payload.type) {
        case actionTypes.SET_ACTIVE_PROFILE:
            return Object.assign({}, state, { active: payload.value })

        default:
            return state;
    }
};

// Every change to the profile in question will trigger a dispatch.
// TODO: need to test and make sure this doesn't fire when ANY profile changes.
Meteor.startup(() => {
    Tracker.autorun(() => {
        store.dispatch(
            setActiveProfile(Profiles.current())
        )
    })
})

export default reducer