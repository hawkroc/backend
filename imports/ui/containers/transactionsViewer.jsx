import React from "react"
import { connect } from "react-redux"

import labelMethodTypes from "../../api/profiles/methods/labelMethodTypes"
import TransactionsGridComponent from "../components/transactions/transactionsGrid"
import { fetchEtherExchangeRate } from "../../redux/actions/accountActions"
import TransactionsExportComponent from "../components/transactions/transactionsExport"

class TransactionsViewer extends React.Component {
    componentDidMount() {
        this.props.fetchExchangeRate()
    }

    render() {
        const {
            usdExchangeRate,
            languageConfig,
            accounts,
            addressAliasLookup,
            labelTypes,
            transactionLabels,
            currencies,
            onLabelUpdated
        } = this.props

        return (
            <div>
                <div className="exchange">
                    <span style={{ color: "black", fontStyle: "italic" }}>
                        {languageConfig.Current}:
                    </span>{" "}
                    1 ETH = {usdExchangeRate} USD
                </div>
                <TransactionsExportComponent {...{ accounts }} />
                <TransactionsGridComponent
                    {...{
                        accounts,
                        addressAliasLookup,
                        usdExchangeRate,
                        labelTypes,
                        onLabelUpdated,
                        currencies,
                        transactionLabels
                    }}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    // TODO: need to figure out how to wait for initial state from meteor
    // collections before rendering top-level components.

    let accounts = state.accounts.items
    let trackedAccounts = state.profiles.active.trackedAccounts

    // Create an account->tracked account lookup.
    let addressAliasLookup = accounts.map(
        a => ({
            _id: a._id,
            address: a.address,
            trackedAccount: trackedAccounts.find(
                tracked => tracked.accountId === a._id
            )
        })
    )

    let labelTypes = state.profiles.active.transactionDataTypes.gstLabels.items
    let transactionLabels = state.profiles.active.transactionData
        .filter(i => i.dataTypeName === 'gst-labels')

    return {
        accounts,
        addressAliasLookup,

        labelTypes,
        transactionLabels,

        currencies: state.profiles.currencies,
        usdExchangeRate: state.accounts.usdExchangeRate,

        languageConfig: state.navigation.languageConfig
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onLabelUpdated: ({ txId, labelTypeId }) => {
            Meteor.call(labelMethodTypes.PROFILE_UPDATE_LABEL, { txId, labelTypeId })
        },

        fetchExchangeRate: () => {
            dispatch(fetchEtherExchangeRate())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsViewer)
