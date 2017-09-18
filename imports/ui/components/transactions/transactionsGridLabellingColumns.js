import { Meteor } from 'meteor/meteor'

import React from 'react'
import { Select } from 'antd'

import methodTypes from '../../../modules/transaction-labelling/transactionLabellingModuleMethodTypes'

const onLabelUpdated = ({ txId, labelTypeId }) => {
    Meteor.call(methodTypes.PROFILE_UPDATE_LABEL, { txId, labelTypeId })
}

/**
 * Column builder for the transaction grid related to the labelling module.
 * 
 */
const buildColumns = ({
    transactionLabellingModule
}) => {
    let columns = [
        /**
         * Label drop-down selection.
         */
        {
            title: 'Label',
            dataIndex: 'labelling_labelTypeId',
            key: 'labelling_labelTypeId',
            width: '6%',

            render: (value, record) => {
				return (
					<div>
						<Select
							showSearch
							value={value}
							
							style={{ width: '100%' }}
							placeholder="Select a label"
							optionFilterProp="name"

							filterOption={
                                (input, option) =>
                                    option.props.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                            }

                            onChange={
                                ltId => onLabelUpdated({ txId: record._id, labelTypeId: ltId })
							}
						>
							{
								transactionLabellingModule.labelTypes.items.map(lt => {
									return (
										<Select.Option value={lt._id} key={lt._id}>
											{lt.label}
										</Select.Option>
									)
								})
							}
						</Select>
					</div>
				)
			}
        }
    ]

    return columns
}

export default { buildColumns }