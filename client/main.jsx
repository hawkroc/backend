import { Meteor } from 'meteor/meteor'

import React from 'react'
import { render } from 'react-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from  '../imports/redux/reducers/rootReducer'

import HeaderContentLayout from '../imports/ui/layouts/headerContent'
import BodyContentLayout from '../imports/ui/layouts/bodyContent'

import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import './style.css'
//const { LocaleProvider, locales } = window.antd;

const store = createStore(rootReducer)
 
Meteor.startup(() => {
  render(
    <Provider store={store}>
      <LocaleProvider locale={enUS}>
      <div>
        <HeaderContentLayout />
        <BodyContentLayout />
        {/* <TransactionsViewerContainer /> */}
      </div>
      </LocaleProvider>
    </Provider>, 
    document.getElementById('react-root')
  );
});