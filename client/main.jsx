import { Meteor } from 'meteor/meteor'

import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from  '../imports/redux/reducers'

import App from '../imports/ui/App.jsx'
import './style.css'

const store = createStore(rootReducer)
 
Meteor.startup(() => {
  render(
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('react-root')
  );
});