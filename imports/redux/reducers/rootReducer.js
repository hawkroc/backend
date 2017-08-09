import { combineReducers } from 'redux'

import accountsReducer from './accountsReducer'
import navigationReducer from './navigationReducer'
import configurationReducer from './configurationReducer'
import transactionsReducer from './transactionsReducer'

/**
 * Root redux reducer provided to createStore.
 * 
 */
const rootReducer = combineReducers({
    accounts: accountsReducer,
    navigation: navigationReducer,
    configuration: configurationReducer,
    transactions: transactionsReducer
});

export default rootReducer;