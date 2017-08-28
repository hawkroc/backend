import React from 'react'
import { connect } from 'react-redux'
import labelMethodTypes from '../../api/profiles/methods/labelMethodTypes'
import TransactionsGridComponent from '../components/transactions/transactionsGrid'
import { fetchEtherExchangeRate } from '../../redux/actions/accountActions'
import TransactionsExportComponent from '../components/transactions/transactionsExport'

class TransactionsViewer extends React.Component {
    componentDidMount(){
        this.props.fetchExchangeRate();
    }

    render() {
 
        const {
            dataReady,
            usdExchangeRate,
            language_config,
            accounts,
            addressAliasLookup,
        
            labelTypes,
            transactionLabels,
            onLabelUpdated
        } = this.props;

        return (
            dataReady ? (
                <div>
                    <div className="exchange">
                        <span style={{ color: "black", fontStyle: "italic" }}>{language_config.Current}:</span> 1 ETH = {usdExchangeRate} USD
                    </div>
                    <TransactionsExportComponent {...{ accounts }}/>
                    <TransactionsGridComponent {...{ 
                        accounts, 
                        addressAliasLookup, 
                        usdExchangeRate, 
                        labelTypes, 
                        onLabelUpdated, 
                        transactionLabels 
                    }}/>
                </div>
            )
            : <p>"Loading data"</p>
        )
    }
}

const mapStateToProps = (state) => {

    // TODO: need to figure out how to wait for initial state from meteor
    // collections before rendering top-level components.

    let accounts = state.accounts.items
let trackedAccounts = state.profiles.active
    ? state.profiles.active.trackedAccounts
    : null

let dataReady = !!trackedAccounts

    // Create an address->alias lookup.
    let addressAliasLookup = null,
        labelTypes = [],
        transactionLabels = {};

    if (dataReady) {
        addressAliasLookup = accounts.map(a => ({
            _id: a._id,
            address: a.address,
            trackedAccount: trackedAccounts.find(tracked => tracked.accountId === a._id)
        }))

        labelTypes = state.profiles.active.labelTypes

        transactionLabels = state.profiles.active.labels
    }
    return {
        dataReady, accounts, addressAliasLookup, labelTypes,

        // TODO: from API.
        usdExchangeRate: state.accounts.usdExchangeRate,
        language_config :state.navigation.language_config,
        transactionLabels
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onLabelUpdated: ({txId, labelTypeId}) => {
            Meteor.call(labelMethodTypes.PROFILE_UPDATE_LABEL, {txId, labelTypeId})
        },
        fetchExchangeRate: () => {
           return dispatch(fetchEtherExchangeRate());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsViewer)