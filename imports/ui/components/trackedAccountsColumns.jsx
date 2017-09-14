import React from 'react'
import { Popconfirm } from 'antd'
import ClickCopyCell from './common/clickCopyCell'
import EditableCell from './common/editableCell'
import Accounts from '../../api/accounts/accounts'

export const buildColumns = ({
	// languageConfig
	languageConfig,
	// Callback for updating an account.
	idToAddressBalance,
	onUpdateTrackedAccount,
	onDeleteTrackedAccount
}) => {
	return [
		// Human readable alias of account.
		{
			title: languageConfig.Alias,
			dataIndex: 'alias',
			width: '40%',

			render: (text, record) => (
				<EditableCell
					value={text}
					onChangeConfirmed={newValue => {
						record.alias = newValue
						onUpdateTrackedAccount(record)
					}}
				/>
			)
		},
		{
			title: languageConfig.Address,
			dataIndex: 'accountId',
			width: '30%',

			render: (text, record) => {
				let address = ''
				if (idToAddressBalance) {
					for (let idAddress of idToAddressBalance) {
						if (text === idAddress.id) {
							address = idAddress.address
							break
						}
					}
				}
				return (<div className="editable-cell">
					<div className="editable-cell-text-wrapper" id={address}>
						{address.substring(0, 12) + '...'}
						<ClickCopyCell text={address}/>
					</div>
				</div>)
			}
		},
		{
			title: languageConfig.Balance,
			dataIndex: 'balance',
			width: '15%',
			render: (text, record) => {
				if (idToAddressBalance) {
					for (let idAddress of idToAddressBalance) {
						if (record.accountId === idAddress.id) {
							return idAddress.balance
						}
					}
				}
				return null
			}
		},
		{
			title: '',
			dataIndex: 'operation',
			render: (text, record) => {
				return (
					<Popconfirm
						title={languageConfig.Stop_tracking}
						onConfirm={() => onDeleteTrackedAccount(record)}
					>
						<a href="#">Remove</a>
					</Popconfirm>
				)
			}
		}
	]
}
