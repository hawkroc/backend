import React from 'react'

import { Popconfirm, Select } from 'antd'
import EditableCell from './common/editableCell'

export const buildColumnsTaxCode = ({
	languageConfig, 
	onUpdateTaxRate,
	onDeleteTaxRate 
}) => {
	return [
		{
			title: languageConfig.Name,
			dataIndex: 'label',
			width: '60%',
			key: 'label',
			sortOrder: 'ascend',
			sorter: (a, b) => a.label > b.label,

			render: (value, record, index) => (
				<div id={value}>
				<EditableCell
					value={value}
					onChangeConfirmed={newValue => {
						record.label = newValue
						onUpdateTaxRate(record)
					}}
				/>
				</div>
			)
		},

		{
			title: languageConfig.Tax_Rate,
			dataIndex: 'rate',
			width: '20%',
			key: 'rate',
			sortOrder: 'ascend',
			sorter: (a, b) => a.rate > b.rate,
			render: (value, record, index) => (
				<div id={record._id}>
				<EditableCell
					value={value}
					onChangeConfirmed={newValue => {
						record.rate = newValue
						onUpdateTaxRate(record)
					}}
				/>
				</div>
			)
		},



		{
			title: '',
			dataIndex: 'operation',
			key:'operation',

			render: (text, record, index) => {
				return (
					<Popconfirm
						title="Are you sure you want to delete this taxCode?"
						onConfirm={() => onDeleteTaxRate(record)}
					>
						<a href="#">Delete</a>
					</Popconfirm>
				)
			}
		}
	]
}
