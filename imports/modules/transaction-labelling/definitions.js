import { Meteor } from 'meteor/meteor'

import React from 'react'
import { Select } from 'antd'

import methodTypes from './methodTypes'

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

			formattedValueTransformer: value => {
				if (!value) return ''
				const labelType = labellingModule.labelTypes.items.find(lt => lt._id === value)
				return !!labelType ? labelType.label : ''
			},

			displayValueTransformer: (_, formattedValue) => formattedValue
		}
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
			width: '10%',

			render: (value, record) => {
				return (
					<div style={{ width: '100%', minWidth: '80px' }}>
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
