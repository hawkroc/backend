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
	let fixed = Number(parseFloat(value).toPrecision(16)) 
	//console.log('1fixed'+new Intl.NumberFormat().format(fixed))
	fixed=new Intl.NumberFormat().format(fixed)
    return fixed.length > 10 
        ? fixed.substr(0, 10) + '...'
        : fixed
}

export const buildColumns = ({
	languageConfig,
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
			key: 'address',
			width: '30%',

			render: value => {
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
			dataIndex: 'accountAddress',
			key: 'balance',
			width: '20%',
			render: value => {
				if (accounts) {
					const account = accounts.find(a => a.address == value)
					if (account) {
						return( //maskLongNumberValue(weiToEther(account.balance))
		  
						<div className="editable-cell">
						<div className="editable-cell-text-wrapper" id={value}>
							{maskLongNumberValue(weiToEther(account.balance))}
							<ClickCopyCell text={account.balance}/>
						</div>
					</div>
)



					}
				}

				return null
			}
		},
		{
			title: '',
			key: 'operation',
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
