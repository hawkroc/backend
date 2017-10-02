import React from 'react'
import { Popconfirm } from 'antd'
import ClickCopyCell from './common/clickCopyCell'
import EditableCell from './common/editableCell'
import Accounts from '../../api/accounts/accounts'

const weiToEther = value => {
    if (value === null || value === undefined)
        return ''

    return value * Math.pow(10, -18)
}

const maskLongNumberValue = value => {
    // Fix values to avoid automatic conversion to scientific notation.
	const fixed = Number(parseFloat(value).toPrecision(16))
    
    return fixed.toString().length > 10 
        ? fixed.toString().substr(0, 10) + '...'
        : fixed.toString()
}

export const buildColumns = ({
	// languageConfig
	languageConfig,
	// Callback for updating an account.
	accounts,
	onUpdateTrackedAccount,
	onDeleteTrackedAccount
}) => {
	return [
		// Human readable alias of account.
		{
			title: languageConfig.Alias,
			dataIndex: 'alias',
			width: '35%',

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
			dataIndex: 'accountAddress',
			width: '30%',

			render: (value, record) => {
				return (
					<div className="editable-cell">
						<div className="editable-cell-text-wrapper" id={value}>
							{value.substring(0, 12) + '...'}
							<ClickCopyCell text={value}/>
						</div>
					</div>
				)
			}
		},
		{
			title: languageConfig.Balance,
			dataIndex: 'Balance (ETH)',
			width: '20%',
			render: (value, record) => {
				if (accounts) {
					const account = accounts.find(a => a.addrss == value)
					if (account) {
						maskLongNumberValue(weiToEther(account.balance))
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
