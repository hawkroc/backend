import { Meteor } from 'meteor/meteor'

import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from  '../imports/redux/reducers'
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import App from '../imports/ui/App.jsx'
import './style.css'
//const { LocaleProvider, locales } = window.antd;

const store = createStore(rootReducer)
 
Meteor.startup(() => {
  render(
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
      <App />
      </LocaleProvider>
    </Provider>, 
    document.getElementById('react-root')
  );
});