import React from 'react'

import { Table, Button, Modal, Input } from 'antd'
import { message, notification } from 'antd'

import { buildColumns } from './usersEditorColumns'
import { sanitizeKeyString } from '../../common/inputTransformationHelpers'

/**
 * Displays and manages profile users.
 * 
 */
class component extends React.Component {
	constructor(args) {
		super(args)

		// Local state for UI interactions.
		this.state = {
			newUserModalVisible: false,
			newUserName: '',
			addKey: ''
		}
	}

	handleUserNameChange = e => {
		this.setState({ newUserName: e.target.value })
	}
	handleUserPublicKeyChange = e => {
		this.setState({ newUserPublicKey: e.target.value })
	}
	showAddModal = () => this.setState({ newUserModalVisible: true })

	hideAddModal = () => this.setState({
		newUserModalVisible: false,
		newUserName: '',
		newUserPublicKey: ''
	})

	submitNewUser = () => {

		const { users, onInsertUser } = this.props

		let name = this.state.newUserName
		let publicKey = this.state.newUserPublicKey

		// Validation.
		if (!name || name.trim() === '') {
			message.error('Invalid user name')
			return
		}
		name = name.trim()
		
		const validPublicKey = sanitizeKeyString(publicKey)
		if (!validPublicKey) {
			message.error('Invalid key format')
			return
		}

		if (!!users.find(u => u.services['centrality-blockeeper'].publicKey 
				=== validPublicKey)) {
			message.error('User key already exists')
			return
		}

		onInsertUser({
			name,
			publicKey: validPublicKey
		})

		this.hideAddModal()

		notification['success']({
			message: 'User successfully added',
			description: 'They can now log into Blockeeper with their private key',
		})
	}

	render() {
		const {
			languageConfig,
			onInsertUser,
			onDeleteUser,
			users
		} = this.props

		// Build the column set for this table.
		const columns = buildColumns({ languageConfig, onDeleteUser })

		return (
			<div>
				<h2>Organisation users</h2>
				<br />
				<Table
					bordered
					rowKey={user => user._id}
					dataSource={users}
					columns={columns}
				/>
				<Button
					className="editable-add-btn"
					onClick={() => this.showAddModal()}
				>
					Add user
				</Button>
				<Modal
					title="Create new user"
					visible={this.state.newUserModalVisible}
					onOk={() => this.submitNewUser()}
					onCancel={() => this.hideAddModal()}
				>
					<h4 style={{ marginBottom: '8px' }}>Name</h4>
					<Input
						size="large"
						placeholder="Name"
						value={this.state.newUserName}
						onChange={this.handleUserNameChange}
					/>
					<br />
					<br />
					<h4 style={{ marginBottom: '8px' }}>User's public key</h4>
					<Input
						size="large"
						placeholder="User's public key"
						value={this.state.newUserPublicKey}
						onChange={this.handleUserPublicKeyChange}
					/>
				</Modal>
			</div>
		)
	}
}

export default component
