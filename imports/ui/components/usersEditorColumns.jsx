import React from 'react'
import ClickCopyCell from './common/clickCopyCell'

import { Popconfirm } from 'antd'

export const buildColumns = ({
	languageConfig,
	onDeleteUser
}) => {
	return [
		{
			title: "Name",
			key: "name",
			width: '40%',

			render: (_, record) => {
				const name = record.services['centrality-blockeeper'].name
				return name
			}
		},
		{
			title: "Public key",
			key: "publickey",
			width: '30%',

			render: (_, record) => {
				const publicKey = '0x' + record.services['centrality-blockeeper'].publicKey
				return (
					<div className="editable-cell">
						<div className="editable-cell-text-wrapper" id={publicKey}>
							{publicKey.substring(0, 16) + '...'}
							<ClickCopyCell text={publicKey}/>
						</div>
					</div>
				)
			}
		},
		{
			title: '',
			key: "removeoperation",
			dataIndex: 'operation',
			width: '10%',
			render: (_, record) => {
				return (
					// Don't allow the user to remove themselves
					record._id === Meteor.userId() ?
						null
						: <Popconfirm
							title={languageConfig.Stop_tracking}
							onConfirm={() => onDeleteUser(record._id)}
						>
							<a href="#">Remove</a>
						</Popconfirm>
				)
			}
		}
	]
}
