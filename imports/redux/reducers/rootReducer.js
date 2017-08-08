import { combineReducers } from 'redux';
import accountsReducer from './accountsReducer';
import navigationReducer from './navigationReducer';

/**
 * Root redux reducer provided to createStore.
 * 
 */
const rootReducer = combineReducers({
    accountsReducer,
    navigationReducer
});

export default rootReducer;