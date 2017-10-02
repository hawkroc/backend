import { Meteor } from 'meteor/meteor'
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import TrackedAccountsEditor from '../components/trackedAccountsEditor'
import LabelTypeEditorComponent from '../components/labelTypeEditor'

import trackedAccountMethodTypes from '../../api/profiles/methods/trackedAccountMethodTypes'


/**
 * Container for configuring high-level application settings.
 * 
 */
class ApplicationSettings extends React.Component {
	render() {
		const {
			languageConfig,
			trackedAccounts,
			accounts,

			transactionLabellingModuleEnabled,
			transactionLabellingModule,

			onInsertTrackedAccount,
			onUpdateTrackedAccount,
			onDeleteTrackedAccount
		} = this.props

		return (
			<div>
				<Row>
					<Col offset={1} span={10}>
						<TrackedAccountsEditor {...{
							languageConfig,
							accounts,
							trackedAccounts,
							onInsertTrackedAccount,
							onUpdateTrackedAccount,
							onDeleteTrackedAccount
						}} />
					</Col>
					<Col offset={1} span={9}>
						{
							!!transactionLabellingModuleEnabled ?
								<LabelTypeEditorComponent {...{
									languageConfig,
									transactionLabellingModule
								}} />
							: null
						}
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	let transactionLabellingModuleEnabled = state.profiles.active
		.isModuleEnabled('transaction-labelling')
	let transactionLabellingModule = state.profiles.active
		.getModule('transaction-labelling')

	return {
		accounts: state.accounts.items,
		trackedAccounts: state.profiles.active.trackedAccounts,

		transactionLabellingModule,
		transactionLabellingModuleEnabled
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
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationSettings)
