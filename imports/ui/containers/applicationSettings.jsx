import React from 'react'
import { connect } from 'react-redux'

import { Row, Col, Button, notification } from 'antd'

import TrackedAccounts from '../components/trackedAccounts'
import TransactionLabels from '../components/transactionLabels'

import Accounts from '../../api/accounts/accounts'
import Profiles from '../../api/profiles/profiles'


/**
 * Container for configuring high-level application settings.
 * 
 */
const View = ({
    accounts,
    labelTypes,

    onUpdateAccount,
    onUpdateLabelType
}) => (
    <div>
        <Row>
            <Col offset={1} span={10}>
                <TrackedAccounts {...{accounts, onUpdateAccount}} />
            </Col>
            <Col offset={1} span={9}>
                <TransactionLabels {...{labelTypes, onUpdateLabelType}} />
            </Col>
        </Row>
    </div>
)

const mapStateToProps = (state) => {

    return {
        accounts: state.accounts.items,
        labelTypes: state.profiles.active.labelTypes
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        onUpdateAccount: (updatedAccount) => {
            // Update the account.
            Accounts.update(updatedAccount._id, {
                $set: {
                    address: updatedAccount.address,
                    alias: updatedAccount.alias
                }
            })
        },
        
        onUpdateLabelType: (updatedLabel) => {
            // Update the active profile's label.
            Meteor.call('profiles.current.update.labelType', {
                ...updatedLabel
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)