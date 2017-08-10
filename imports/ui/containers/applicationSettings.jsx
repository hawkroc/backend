import React from 'react'
import { connect } from 'react-redux'

import { Row, Col, Button, notification } from 'antd'

import TrackedAccounts from '../components/trackedAccounts'
import TransactionLabels from '../components/transactionLabels'

import Accounts from '../../api/accounts/accounts'


/**
 * Container for configuring high-level application settings.
 * 
 */
const View = ({
    accounts,
    transactionLabels,

    onUpdateAccount,
    onUpdateLabel
}) => (
    <div>
        <Row>
            <Col offset={1} span={10}>
                <TrackedAccounts {...{accounts, onUpdateAccount}} />
            </Col>
            <Col offset={1} span={9}>
                <TransactionLabels {...{transactionLabels, onUpdateLabel}} />
            </Col>
        </Row>
    </div>
)

const mapStateToProps = (state) => {

    return {
        accounts: state.accounts.items,
        transactionLabels: state.configuration.labels
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onUpdateAccount: (account) => {
            alert("Updating account!!! " + account.alias + "   " + account.address)
        },
        
        onUpdateLabel: (label) => {
            alert("Updating label!!! " + label.name + "   " + label.gst)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)