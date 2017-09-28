import { Meteor } from 'meteor/meteor'

import React from 'react'
import { Select } from 'antd'

import * as methodTypes from './methodTypes'

const weiToEther = value => {
	if (value === null || value === undefined)
		return 0

	return value * Math.pow(10, -18)
}

const maskLongNumberValue = value => {
	// Fix values to avoid automatic conversion to scientific notation.
	const fixed = Number(parseFloat(value).toPrecision(16))
	
	return fixed.toString().length > 8 
		? fixed.toFixed(8) + '...'
		: fixed.toString()
}

/**
 * Key definitions for displaying and exporting data.
 * 
 */
const getKeyDefs = (taxationModule) => {
	return [
		// Masked tax code.
		{
			id: 'taxation_code',
			key: 'taxation_codeId',
			displayKey: 'VAT code',

			formattedValueTransformer: value => {
				let code = taxationModule.taxCodes.items.find(tc => tc.codeId === value)
				return !!code ? code.label : ''
			},
			displayValueTransformer: (_, formattedValue) => formattedValue
		},
		// Gross tax component.
		{
			id: 'taxation_gross_tax',
			key: 'taxation_grossTax',
			displayKey: 'Gross VAT (ETH)',

			formattedValueTransformer: value => !!value ? weiToEther(value) : '',
			displayValueTransformer: (value, formattedValue) => 
				!!value ? maskLongNumberValue(formattedValue) : ''
		},
		// Net transaction value after tax.
		{
			id: 'taxation_net_value',
			key: 'taxation_netValue',
			displayKey: 'Net value (ETH)',

			formattedValueTransformer: value => !!value ? weiToEther(value) : '',
			displayValueTransformer: (value, formattedValue) => 
				!!value ? maskLongNumberValue(formattedValue) : ''
		}
	]
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

	let columnKeys = getKeyDefs(taxationModule)
	let columns = []

	for(let ck of columnKeys) {

		let column = {
			title: ck.displayKey,
			dataIndex: ck.key,
			key: ck.id,

			// Default: render display value.
			render: (value, record) => {
				let formattedValue = ck.formattedValueTransformer(value, record)
				return ck.displayValueTransformer(value, formattedValue)
			}
		}

		// Build columns based on data keys.
		switch (ck.id) {
			case 'taxation_code':
				column.render = (value, record) => {
					return (
						<div style={{ width: '100%', minWidth: '80px' }}>
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
						</div>
					)
				}
				break

			default:
				break
		}

		columns.push(column)
	}

	return columns
}

export default { getKeyDefs, buildColumns }