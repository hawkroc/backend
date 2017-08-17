import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise'
import rootReducer from  './reducers/rootReducer'

/**
 * add react-thunk and promise
 */

export default store = createStore(
  rootReducer,
  //defaultState,
  applyMiddleware(
    thunkMiddleware,
    promise
  )
);

