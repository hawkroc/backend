import React from 'react'
import { Select } from 'antd'

const weiToEther = (value) => (value * Math.pow(10, -18)).toFixed(8)

export const buildColumns = ({
    addressAliasLookup, 
    usdExchangeRate, 
    labelTypes,

    transactionLabels,
    onLabelUpdated
}) => {

    // Mask an account address with an alias if found.
    // Otherwise default to its address.
    const accountAliasMask = (address) => {
        let mapping = addressAliasLookup.find(a => a.address === address)

        if (mapping) {
            return mapping.trackedAccount.alias
        } else {
            return address.substring(0, 12) + "..."
        }
    }

    const findTransactionLabel = (txId) => {
        let label = transactionLabels.find(l => l.transactionId == txId)
        if (label) {
            return label.labelTypeId
        }

        return undefined
    }

    return [
        {
            title: 'Time',
            dataIndex: 'timeStamp',
            key: 'timeStamp',
            width: "10%",
            sortOrder: "descend",

            render: (text) => {
                return (
                    new Date(parseInt(text) * 1000).toLocaleDateString()
                )
            },

            sorter: (a, b) => a.timeStamp - b.timeStamp,
        },
        {
            title: 'From',
            dataIndex: 'from',
            key: 'from',
            width: "12%",

            render: (text, record) => (
                accountAliasMask(text)
            ),
        },

        {
            title: 'To',
            dataIndex: 'to',
            key: 'to',
            width: "12%",

            render: (text, record) => (
                accountAliasMask(text)
            )
        },
        {
            title: 'ETH',
            dataIndex: 'gas',
            key: 'gas',
            width: "6%",

            render: (text, record) => {
                return (
                    weiToEther(text  * record.gasPrice)
                );
            },
        },
        {
            title: 'USD',
            dataIndex: 'gasPrice',
            key: 'gasPrice',
            width: "6%",

            render: (text, record) => {
                return (                
                    weiToEther(text  * record.gas) * usdExchangeRate
                    ).toFixed(2)
            }
        },
        {
            title: 'Internal',
            dataIndex: 'contractAddress',
            key: 'contractAddress',
            width: "6%",

            render: (text) => {
                return text === "" ? '' : 'Internal';
            },

            filters: [
                {text: 'No', value: 'No'},
                {text: 'Yes', value: 'Yes'},
            ],
            onFilter: (value, record) => {
                record.contractAddress.includes(value)
            },
        },
        {
            title: ' Label',
            key: 'type',
            width: "12%",
            render: (text, record) => {

                let labelTypeId = findTransactionLabel(record._id)
              
                return(
                    <div>
                        <Select 
                            showSearch
                            value={labelTypeId}
                            onChange={(labelTypeId) => onLabelUpdated({txId: record._id, labelTypeId})}
                            style={{width: "100%"}}
                            placeholder="Select a label"
                            optionFilterProp="name"
                            filterOption={
                                (input, option) => option.props.children.toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                        {
                            labelTypes.map(lt => {
                                return <Select.Option value={lt._id} key={lt._id}>{lt.name}</ Select.Option>
                            })
                        }
                        </Select>
                    </div>
                )},
        },
    ]
}