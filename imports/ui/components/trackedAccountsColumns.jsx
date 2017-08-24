import React from 'react'

import {Popconfirm} from 'antd'
import EditableCell from './common/editableCell'

import Accounts from '../../api/accounts/accounts'

export const buildColumns = ({
    // Callback for updating an account.
    idToAddressBalance,
    onUpdateTrackedAccount,
    onDeleteTrackedAccount
}) => {
    return [
        // Human readable alias of account.
        {
            title: 'Alias',
            dataIndex: 'alias',
            width: '40%',

            render: (text, record, index) => (<EditableCell
                value={text}
                onChangeConfirmed={(newValue) => {
                record['alias'] = newValue;
                onUpdateTrackedAccount(record)
            }}/>)
        }, {
            title: 'Address',
            dataIndex: 'accountId',
            width: '30%',

            render: (text, record, index) => {
                if (idToAddressBalance) {
                    for (let idAddress of idToAddressBalance) {
                        if (text === idAddress.id) {
                            return idAddress.address
                        }
                    }
                } 
                return null;
            }
        }, {
            title: 'Balance',
            dataIndex: 'balance',
            width: '15%',
            render: (text, record, index) => {
                if (idToAddressBalance) {
                    for (let idAddress of idToAddressBalance) {
                        if (record.accountId === idAddress.id) {
                            return idAddress.balance
                        }
                    }
                }
                return null;
            }
        }, {
            title: '',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <Popconfirm
                        title="Are you sure you want to stop tracking this account?"
                        onConfirm={() => onDeleteTrackedAccount(record)}>
                        <a href="#">Remove</a>
                    </Popconfirm>
                )
            }
        }
    ]
}