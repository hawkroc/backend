import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, notification } from 'antd'
import {fetchEtherBalance} from '../../redux/actions/profileActions.js'

import TrackedAccounts from '../components/trackedAccounts'
import TransactionLabels from '../components/transactionLabels'
import Accounts from '../../api/accounts/accounts'
import Profiles from '../../api/profiles/profiles'
import labelMethodTypes from '../../api/profiles/methods/labelMethodTypes'
import trackedAccountMethodTypes from '../../api/profiles/methods/trackedAccountMethodTypes'


/**
 * Container for configuring high-level application settings.
 * 
 */
class ApplicationSettings extends React.Component{
    componentDidMount=()=>{
      
    this.props.onFetchBalance(this.props.idToAddressBalance,this.props.trackedAccounts,this.props.accountsItems);

    }
    render(){
    const    {
            trackedAccounts,
            accountsItems,
            idToAddressBalance,
            labelTypes,      
            onInsertTrackedAccount,
            onUpdateTrackedAccount,
            onDeleteTrackedAccount,
            onInsertLabelType,
            onUpdateLabelType,
            onDeleteLabelType
    }=this.props;
    return(
        <div>
        <Row>
            <Col offset={1} span={10}>
                <TrackedAccounts {...{accountsItems,idToAddressBalance,trackedAccounts, onInsertTrackedAccount, onUpdateTrackedAccount, onDeleteTrackedAccount}} />
            </Col>
            <Col offset={1} span={9}>
                <TransactionLabels {...{labelTypes, onInsertLabelType, onUpdateLabelType, onDeleteLabelType}} />
            </Col>
        </Row>
    </div>
    )
    }
}




const mapStateToProps = (state) => {

   return {
       accountsItems:state.accounts.items,
        idToAddressBalance:state.profiles.idToAddressBalance,
        trackedAccounts: state.profiles.active.trackedAccounts,
        labelTypes: state.profiles.active.labelTypes
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {
        
        onUpdateTrackedAccount: (updatedAccount) => {

            // Update the active profile's label.
            Meteor.call(trackedAccountMethodTypes.PROFILE_UPDATE_TRACKEDACCOUNT, {
                ...updatedAccount
            })
        },

        onInsertTrackedAccount: (newAccount) => {
            Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
                ...newAccount
            })
        },

        onDeleteTrackedAccount: (trackedAccount) => {
            Meteor.call(trackedAccountMethodTypes.PROFILE_DELETE_TRACKEDACCOUNT, {
                _id: trackedAccount._id
            })
        },
        
        onUpdateLabelType: (updatedLabel) => {
            // Update the active profile's label.
            Meteor.call(labelMethodTypes.PROFILE_UPDATE_LABELTYPE, {
                ...updatedLabel
            })
        },

        onInsertLabelType: (newLabel) => {
            Meteor.call(labelMethodTypes.PROFILE_INSERT_LABELTYPE, {
                ...newLabel
            })
        },

        onDeleteLabelType: (label) => {
            Meteor.call(labelMethodTypes.PROFILE_DELETE_LABELTYPE, {
                _id: label._id
            })
            
        },

        onFetchBalance :(idToAddressBalance,trackedAccounts,accountsItems)=>{      
        
         return  dispatch(fetchEtherBalance(idToAddressBalance,trackedAccounts,accountsItems))
         } 
    }   
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationSettings)