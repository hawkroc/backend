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
    trackedAccounts,
    labelTypes,

    onInsertTrackedAccount,
    onUpdateTrackedAccount,
    onDeleteTrackedAccount,
    onInsertLabelType,
    onUpdateLabelType,
    onDeleteLabelType
}) => (
    <div>
        <Row>
            <Col offset={1} span={10}>
                <TrackedAccounts {...{trackedAccounts, onInsertTrackedAccount, onUpdateTrackedAccount, onDeleteTrackedAccount}} />
            </Col>
            <Col offset={1} span={9}>
                <TransactionLabels {...{labelTypes, onInsertLabelType, onUpdateLabelType, onDeleteLabelType}} />
            </Col>
        </Row>
    </div>
)

const mapStateToProps = (state) => {

    return {
        trackedAccounts: state.profiles.active.trackedAccounts,
        labelTypes: state.profiles.active.labelTypes
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        
        onUpdateTrackedAccount: (updatedAccount) => {

            // Update the active profile's label.
            Meteor.call('profiles.active.update.trackedAccount', {
                ...updatedAccount
            })
        },

        onInsertTrackedAccount: (newAccount) => {
            Meteor.call('profiles.active.insert.trackedAccount', {
                ...newAccount
            })
        },

        onDeleteTrackedAccount: (trackedAccount) => {
            Meteor.call('profiles.active.delete.trackedAccount', {
                _id: trackedAccount._id
            })
        },
        
        onUpdateLabelType: (updatedLabel) => {
            // Update the active profile's label.
            Meteor.call('profiles.active.update.labelType', {
                ...updatedLabel
            })
        },

        onInsertLabelType: (newLabel) => {
            Meteor.call('profiles.active.insert.labelType', {
                ...newLabel
            })
        },

        onDeleteLabelType: (label) => {
            Meteor.call('profiles.active.delete.labelType', {
                _id: label._id
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)