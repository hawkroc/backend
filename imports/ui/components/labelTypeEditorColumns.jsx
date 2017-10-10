import React from 'react'

import { Popconfirm, Select } from 'antd'
import EditableCell from './common/editableCell'

export const buildColumns = ({
	languageConfig, 
	onUpdateLabelType,
	onDeleteLabelType 
}) => {
	return [
		{
			title: languageConfig.Name,
			dataIndex: 'label',
			width: '80%',
			sortOrder: 'ascend',
			sorter: (a, b) => a.label > b.label,

			render: (value, record, index) => {
				let color=''
				if(value.indexOf('A New label')>-1){
				   color='addNewLable'
				 
				}
			return (	<div className={color}>
				<EditableCell
					value={value}
					onChangeConfirmed={newValue => {
						record.label = newValue
						onUpdateLabelType(record)
					}}
				/>
				</div>
			)
		}
		},
		{
			title: '',
			dataIndex: 'operation',

			render: (text, record, index) => {
				return (
					<Popconfirm
						title="Are you sure you want to delete this label?"
						onConfirm={() => onDeleteLabelType(record)}
					>
						<a href="#">Delete</a>
					</Popconfirm>
				)
			}
		}
	]
}
