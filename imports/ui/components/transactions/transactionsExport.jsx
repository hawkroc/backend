import React from 'react'
import { connect } from 'react-redux'

import { Button, Icon, Modal, Select } from 'antd'
import { CSVLink } from 'react-csv'

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
			exportFieldSelected: ['timeStamp', 'from', 'to', 'value'],
			csvData: []
		}
	}

	openModal() {this.setState({ modalVisible: true })}
	closeModal() {this.setState({ modalVisible: false })}
	cleanModal() {this.setState({  })}
	handleFieldChange(value) { this.setState({exportFieldSelected: value}) }

	handleDownload() {
		let csvData = []

		this.props.transactions.forEach(t => {
			csvData.push(_.pick(t, this.state.exportFieldSelected))
		})

		this.setState({csvData})
		this.closeModal()
	}

	render() {
		let exportFieldOptions = [ ]

		if (!!this.props.transactions && this.props.transactions.length > 0) {
			let t = this.props.transactions[0]

			Object.keys(t).forEach(k => {
				exportFieldOptions.push(k)
			})
		}

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
						defaultValue={['timeStamp', 'from', 'to', 'value']}
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
