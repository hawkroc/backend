import React from 'react'
import { connect } from 'react-redux'

import { Button, Icon, Modal, Select } from 'antd'
import { CSVLink } from 'react-csv'

const DEFAULT_EXPORT_FIELDS = ['Timestamp', 'From', 'To', 'ETH']

/**
 * Component for exporting transaction data.
 * 
 */
class TransactionsExport extends React.Component {
	constructor(...args) {
		super(...args)

		// Using local state for simple transitions.
		this.state = {
			modalVisible: false,
			exportFieldSelected: DEFAULT_EXPORT_FIELDS,
			csvData: []
		}
	}

	openModal() {this.setState({ modalVisible: true })}
	closeModal() {this.setState({ modalVisible: false })}
	handleFieldChange(value) { this.setState({exportFieldSelected: value}) }

	handleDownload() {
		let csvData = []
		let selectedFieldDisplayKeys = this.state.exportFieldSelected

		// Pick transaction data into an object based on indices.
		this.props.transactions.forEach(t => {
			let txExport = { }

			// Compute and set the formatted value for exporting.
			// Rename the object keys to the display names again for export.
			selectedFieldDisplayKeys.forEach(dispKey => {
				let keyDef = this.props.transactionKeyDefs.find(
					kd => kd.displayKey === dispKey
				)

				Object.defineProperty(
					txExport, 
					dispKey,
					Object.getOwnPropertyDescriptor(t, keyDef.key)
				)

				txExport[dispKey] = keyDef.formattedValueTransformer(
					t[keyDef.key], t
				)
			})

			csvData.push(txExport)
		})

		this.setState({csvData})
		this.closeModal()
	}

	render() {
		let exportFieldOptions = this.props.transactionKeyDefs
			.map(k => k.displayKey)

		return (
			<div style={{ marginLeft: '1em' }}>
				<Button onClick={() => this.openModal()}>
					<Icon type="download" />Export data
				</Button>
				<Modal
					title="Export transaction data"
					visible={this.state.modalVisible}
					onCancel={() => this.closeModal()}

					footer={[
						<Button
							key="back" size="large"
							onClick={() => this.closeModal()}>Cancel</Button>,
						<Button
							key="submit" type="primary" size="large"
							onClick={() => this.handleDownload()}>
							<CSVLink
								filename="BLOCKEEPER-export.csv"
								data={this.state.csvData}
							>Download</CSVLink>
						</Button>
					]}
				>
                    Select export format:
					<Select
						style={{ width: '100%' }}
						defaultValue="csv"
					>
						<Select.Option key="csv">CSV</Select.Option>
					</Select>
					<br />
                    Select export fields:
					<Select
						mode="multiple"
						style={{ width: '100%' }}
						placeholder="Please select export fields"
						defaultValue={DEFAULT_EXPORT_FIELDS}
						onChange={(value) => this.handleFieldChange(value)}
					>
						{
							exportFieldOptions.map(f => {
								return (
									<Select.Option key={f}>{f}</Select.Option>
								)
							})
						}
					</Select>
				</Modal>
			</div>
		)
	}
}

export default TransactionsExport
