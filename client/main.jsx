import { Meteor } from 'meteor/meteor'

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'

import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'

// Subscribe the client to all of our API collections.
import subscribeCollections from '../imports/client/subscribeCollections'

import './style.css'

import store from '../imports/redux/store'
import RootContainer from '../imports/ui/containers/rootContainer'

 
Meteor.startup(() => {

    subscribeCollections.apply();

    render(
        <Provider store={store}>
            <RootContainer/>
        </Provider>,

        document.getElementById('react-root')
    );
});