import { Meteor } from "meteor/meteor"
import React from 'react'

import { Table, Button, Modal, Input, message, notification } from 'antd'

import { buildColumns } from './trackedAccountsEditorColumns'
import { sanitizeAddressString } from '../../common/inputTransformationHelpers'

/**
 * Presents a grid containing accounts currently tracked by the application.
 * 
 */
class TrackedAccountsEditorComponent extends React.Component {
	constructor(args) {
		super(args)

		// Local state for minor changes.
		this.state = {
			addModalVisible: false,
			validation: false,
			addAlias: '',
			addAddress: ''
		}
	}

	showErrorMessage = (info) => {
		message.error(info)
	}

	openNotificationWithIcon = (type) => {
		notification[type]({
			message: 'Account has successfully been tracked',
			description: 'Transaction data for this address will be available soon',
		})
	}

	showAddModal() {
		this.setState({ addModalVisible: true })
	}

	hideAddModal() {
		this.setState({
			addModalVisible: false,
			addAlias: '',
			addAddress: ''
		})
	}

	handleAddAliasChange = (e) => {
		this.setState({ addAlias: e.target.value })
	}

	handleAddAddressChange = (e) => {
		this.setState({ addAddress: e.target.value })
	}

	submitAdd = () => {
		const { addAddress, addAlias } = this.state

		const validatedAddress = sanitizeAddressString(addAddress)
		if (!validatedAddress) {
			this.showErrorMessage('Invalid address format')
			return null
		}

		// Accounts can only be tracked once per profile.
		const existingTrackedAccount = this.props.accounts.find(
			a => a.address === '0x' + validatedAddress
		)
		if (!!existingTrackedAccount) {
			this.showErrorMessage('This address is already being tracked')
			return null
		}

		this.props.onInsertTrackedAccount({
			alias: addAlias,
			address: validatedAddress
		})

		this.hideAddModal()
		this.openNotificationWithIcon('success')
	}

	render() {
		const {
			// language
			languageConfig,
			accounts,
			trackedAccounts,
			
			// Called when the UI requests a change to account information.
			onUpdateTrackedAccount,
			onInsertTrackedAccount,
			onDeleteTrackedAccount

		} = this.props

		// Build the column set for this table.
		const columns = buildColumns({ languageConfig, onUpdateTrackedAccount, onDeleteTrackedAccount, trackedAccounts, accounts })

		return (
			<div>
				<h2>{languageConfig.Tracked_accounts}</h2>
				<br />
				<Table bordered
					rowKey={account => account._id}
					dataSource={trackedAccounts}
					columns={columns}
				/>
				<Button className="editable-add-btn"
					onClick={() => this.showAddModal()}>{languageConfig.Add_Account}
				</Button>
				<Modal
					title={languageConfig.Track_new_account}
					visible={this.state.addModalVisible}
					onOk={() => this.submitAdd()}
					onCancel={() => this.hideAddModal()}
				>
					<h3 style={{ marginBottom: '8px' }}>{languageConfig.Account_alias}</h3>
					<Input size="large" placeholder="My new account"
						value={this.state.addAlias} onChange={this.handleAddAliasChange} />
					<br />

					<h3>{languageConfig.Account_address}</h3>
					<Input size="large" placeholder="0x..."
						value={this.state.addAddress} onChange={this.handleAddAddressChange} />
				</Modal>
			</div>
		)
	}
}

export default TrackedAccountsEditorComponent
