import { Meteor } from 'meteor/meteor'

import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from  '../imports/redux/reducers/rootReducer'

import TransactionsFilterContainer from '../imports/ui/containers/transactionsFilter'
import TransactionsViewerContainer from '../imports/ui/containers/transactionsViewer'

import './style.css'

const store = createStore(rootReducer)
 
Meteor.startup(() => {
  render(
    <Provider store={store}>
      <div>
        <TransactionsFilterContainer />
        <TransactionsViewerContainer />
      </div>
    </Provider>, 
    document.getElementById('react-root')
  );
});