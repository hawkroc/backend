import { createStore, applyMiddleware } from 'redux'

import thunkMiddleware from 'redux-thunk'
import rootReducer from  './reducers/rootReducer'

/**
 * The global state container.
 * 
 */
const store =  createStore(
	rootReducer,
	// defaultState,
	applyMiddleware(
		thunkMiddleware,
	)
)

export default store
