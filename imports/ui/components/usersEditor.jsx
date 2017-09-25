import React from 'react'

import { Table, Button, Modal, Input } from 'antd'
import { buildColumns } from './userAccountsColumns'

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

	handleUserNameChange = e => this.setState({ newUserName: e.target.value })
	handleUserPublicKeyChange = e => this.setState({ newUserPublicKey: e.target.value })
	showAddModal = () => this.setState({ newUserModalVisible: true })

	hideAddModal = () => this.setState({
		newUserModalVisible: false,
		newUserName: '',
		newUserPublicKey: ''
	})

	submidNewUser = () => {
		this.props.onInsertUser({
			name: this.state.newUserName,
			publicKey: this.state.newUserPublicKey
		})

		this.hideAddModal()
	}

	render() {
		const {
			languageConfig,
			onInsertUser,
			users
		} = this.props

		// Build the column set for this table.
		const columns = buildColumns({ languageConfig })

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
					onOk={() => this.submidNewUser()}
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
