import React from 'react'

import { Popconfirm } from 'antd'
import EditableCell from './common/editableCell'

export const buildColumns = ({
    // Callback for updating an account.
    onUpdateAccount
}) => {
    return [
        // Human readable alias of account.
        {
            title: 'Alias',
            dataIndex: 'alias',
            width: '30%',

            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChangeConfirmed={(newValue) => {
                            record['alias'] = newValue;
                            onUpdateAccount(record)
                        }
                    }
                />
            )
        }, 
        {
            title: 'Address',
            dataIndex: 'address',
            width: '40%',

            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChangeConfirmed={(newValue) => {
                            record['address'] = newValue;
                            onUpdateAccount(record)
                        }
                    }
                />
            )
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            width: '15%',
            render: (text, record, index) => {
                text
            }
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <Popconfirm 
                            title="Are you sure you want to stop tracking this account?" 
                            onConfirm={() => alert("Handle remove tracked account")}>
                        <a href="#">Remove</a>
                    </Popconfirm>
                )
            }
        }
    ]
}