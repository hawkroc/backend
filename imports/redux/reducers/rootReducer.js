import { combineReducers } from 'redux'

import accountsReducer from './accountsReducer'
import navigationReducer from './navigationReducer'
import profilesReducer from './profilesReducer'

/**
 * Root redux reducer provided to createStore.
 * 
 */
const rootReducer = combineReducers({
	accounts: accountsReducer,
	navigation: navigationReducer,
	profiles: profilesReducer
})

export default rootReducer
