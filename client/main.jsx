import { Meteor } from 'meteor/meteor'

import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

// Subscribe the client to all of our API collections.
import subscribeCollections from '../imports/api/startup/client/subscribeCollections'
subscribeCollections.apply();

import './style.css'

import rootReducer from  '../imports/redux/reducers/rootReducer'

import HeaderContentLayout from '../imports/ui/layouts/headerContent'
import BodyContentLayout from '../imports/ui/layouts/bodyContent'

const store = createStore(rootReducer)
 
Meteor.startup(() => {
    render(
      <Provider store={store}>
        <LocaleProvider locale={enUS}>
          <div>
            <HeaderContentLayout />
            <BodyContentLayout />
          </div>
        </LocaleProvider>
      </Provider>,

      document.getElementById('react-root')
    );
});