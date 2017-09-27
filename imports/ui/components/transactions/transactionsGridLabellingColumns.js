import { Meteor } from 'meteor/meteor'

import React from 'react'
import { Select } from 'antd'

import methodTypes from '../../../modules/transaction-labelling/moduleMethodTypes'

const onLabelUpdated = ({ txId, labelTypeId }) => {
    Meteor.call(methodTypes.PROFILE_UPDATE_LABEL, { txId, labelTypeId })
}

/**
 * Key definitions for displaying and exporting data.
 * 
 */
export const getKeyDefs = (labellingModule) => {
    return [
        // Masked tax code.
        {
            id: 'assigned_label',
            key: 'labelling_labelTypeId',
            displayKey: 'Label',

            formattedValueTransformer: value =>
				!!value ? labellingModule.labelTypes.items.find(lt => lt._id === value)
				: '',

            displayValueTransformer: (_, formattedValue) => formattedValue
        },
	]
}

/**
 * Column builder for the transaction grid related to the labelling module.
 * 
 */
export const buildColumns = ({
    transactionLabellingModule
}) => {

	const keyDefs = getKeyDefs(transactionLabellingModule)

    let columns = [
        /**
         * Label drop-down selection.
         */
        {
            title: keyDefs[0].displayKey,
            dataIndex: keyDefs[0].key,
            key: keyDefs[0].id,

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
