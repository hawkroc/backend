import React from 'react'

import { Popconfirm, Select } from 'antd'
import EditableCell from './common/editableCell'

export const buildColumns = ({
	languageConfig, onUpdateLabelType, onDeleteLabelType }) => {
	return [
		{
			title: languageConfig.Name,
			dataIndex: 'label',
			width: '50%',

			render: (text, record, index) =>
				(<EditableCell
					value={text}
					onChangeConfirmed={newValue => {
						record.label = newValue
						onUpdateLabelType(record)
					}}
				/>)
		},
		{
			title: languageConfig.GST,
			dataIndex: 'gst',
			width: '35%',

			render: (text, record, index) => {
				return (
					<div>
						<Select
							value={record.gst ? 'GST' : 'NOGST'}
							defaultValue={'true'}
							style={{ width: '100%' }}
							onChange={newValue => {
								record.gst = newValue == 'true'
								onUpdateLabelType(record)
							}}
						>
							<Select.Option value={'true'}>GST</Select.Option>
							<Select.Option value={'false'}>NOGST</Select.Option>
						</Select>
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
