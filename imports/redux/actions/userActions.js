import * as types from '../constants/actionTypes'

export const setUsers = (userItems) => {
    return dispatch => dispatch({
        type: types.USERS_RECEIVED,
        value: userItems
    })
}
