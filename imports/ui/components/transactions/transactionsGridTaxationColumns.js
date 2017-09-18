import { Meteor } from 'meteor/meteor'

import React from 'react'
import { Select } from 'antd'

import * as methodTypes from '../../../modules/taxation/taxationModuleMethodTypes'

const weiToEther = value => {
    if (value === null || value === undefined)
        return ''

    return value * Math.pow(10, -18)
}

const maskLongNumberValue = value => {
    return value.toString().length > 8 
        ? value.toString().substring(0, 8) + '...'
        : value.toString()
}

/**
 * Column builder for the transaction grid related to the taxation module.
 * 
 */

const buildColumns = ({
    taxationModule
}) => {

    // TODO: this would ideally be pre-made and passed down from a container
    // component. 
    const onCodeIdUpdated = (record) => {
        Meteor.call(methodTypes.PROFILE_MODULE_TAXATION_UPDATETXTAXCODE, record)
    }

    let columns = [
        /**
         * Tax code drop-down selection.
         */
        {
            title: 'VAT code',
            dataIndex: 'taxation_codeId',
            key: 'taxation_codeId',
            width: '6%',

            render: (value, record) => {
                return (
                    <Select
                        value={value}
                        onChange={codeId =>
                            onCodeIdUpdated({ transactionId: record._id, taxCodeId: codeId })
                        }
                        placeholder="Assign VAT code"
                        style={{ width: '100%' }}
                    >
                        {
                            taxationModule.taxCodes.items.map(c => {
                                return (
                                    <Select.Option value={c.codeId} key={c.codeId}>
                                        {c.label}
                                    </Select.Option>
                                )
                            })
                        }
                    </Select>
                )
            }
        },
        {
            title: 'Gross VAT (ETH)',
            dataIndex: 'taxation_grossTax',
            key: 'taxation_grossTax',
            width: '6%',

            render: (text, record) => {
                return maskLongNumberValue(weiToEther(text))
            }
        },
        {
            title: 'Net value (ETH)',
            dataIndex: 'taxation_netValue',
            key: 'taxation_netValue',
            width: '6%',

            render: (text, record) => {
                return maskLongNumberValue(weiToEther(text))
            }
        }
    ]

    return columns
}

export default { buildColumns }