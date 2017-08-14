import React from 'react';
import { connect } from 'react-redux';

import TransactionsGridComponent from '../components/transactions/transactionsGrid'

const View = ({
    dataReady,
    usdExchangeRate,

    accounts,
    addressAliasLookup,
    
    labelTypes,
    transactionLabels,
    onLabelUpdated
}) => (
    dataReady ? (
        <div>
            <TransactionsGridComponent {...{accounts, addressAliasLookup, usdExchangeRate, labelTypes, onLabelUpdated, transactionLabels}} />
        </div>
    ) : <p>"Loading data"</p>
)

const mapStateToProps = (state) => {

    // TODO: need to figure out how to wait for initial state from
    // meteor collections before rendering top-level components.

    let accounts = state.accounts.items
    let trackedAccounts = state.profiles.active ? 
        state.profiles.active.trackedAccounts
        : null

    let dataReady = !!trackedAccounts

    // Create an address->alias lookup.
    let addressAliasLookup = null, labelTypes = [], transactionLabels = {};

    if(dataReady) {
        addressAliasLookup = accounts.map(a => ({ 
            _id: a._id,
            address: a.address,
            trackedAccount: trackedAccounts.find(tracked => tracked.accountId === a._id)
        }))

        labelTypes = state.profiles.active.labelTypes

        transactionLabels = state.profiles.active.labels
    }

    return {
        dataReady,
        accounts,
        addressAliasLookup,
        labelTypes,

        // TODO: from API.
        usdExchangeRate: 1,
        transactionLabels
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onLabelUpdated: ({txId, labelTypeId}) => {
            Meteor.call('profiles.active.update.label', {
                txId,
                labelTypeId
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)