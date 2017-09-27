import React from 'react'
import { Select } from 'antd'

import ClickCopyCell from '../../ui/components/common/clickCopyCell'

const weiToEther = value => (value * Math.pow(10, -18))

// TODO: if we find ourselves doing too much datetime manipulation, use moment.js.
const monthNames = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

const maskLongNumberValue = value => {
	// Fix values to avoid automatic conversion to scientific notation.
	const fixed = Number(value.toPrecision(16))

	return fixed.toString().length > 8 
		? fixed.toFixed(8) + '...'
		: fixed.toString()
}

// An example of a key definition entry
const EXAMPLE_KEY_DEF = {
	/**
	 * Unique ID representing this key. This value is required as multiple key defs
	 * could use the same record key. i.e. ETH value and USD value are both derived
	 * from the transaction 'value' key.
	 */
	id: 'my_data_key',

	/**
	 * The collection key containing the raw data.
	 * Keys can appear multiple times in this collection (i.e. masking)
	 */
	key: 'myDataKey',

	/**
	 * The column title and exported column header.
	 */
	displayKey: 'My Data-key',

	/**
	 * The formatted value. This should retain all of the useful value,
	 * but formatted nicely (or functionally) for exporting.
	 * 
	 * e.g. unix timestamp -> human readable datetime.
	 * e.g. wei -> ether
	 */
	formattedValueTransformer: (value, record) => {
		return value
	},

	/**
	 * The value to display in the core application. This can simply return
	 * the value/formatted value if there is no further processing required.
	 * 
	 * e.g. full 64 hex character address -> "0xffffff..."
	 */
	displayValueTransformer: (value, formattedValue) => {
		return formattedValue
	}
}

/**
 * Key definitions for displaying and exporting data uniformly.
 * 
 * For module-derived columns, args can be passed into this closure 
 * (i.e. for id->string masking)
 * 
 */
const getKeyDefs = ({
	addressDisplayTransformer,
	valueExchangeTransformer
}) => {
	return [
		// Transaction timestamp.
		{
			id: 'timestamp',
			key: 'timeStamp',
			displayKey: 'Timestamp',

			// ISO string, e.g. 2017-09-26T21:26:45.075Z
			formattedValueTransformer: (value) =>
				(new Date(parseInt(value) * 1000)).toISOString(),

			// YYYY-MMM-dd, e.g 2017-Sep-27.
			displayValueTransformer: (value, formattedValue) => {
				let d = new Date(parseInt(value) * 1000)
				return `${d.getFullYear()}-${monthNames[d.getMonth()]}-${d.getDate()}`
			}
		},
		// Transaction's originating address.
		{
			id: 'from_address',
			key: 'from',
			displayKey: 'From',
			formattedValueTransformer: value => value,
			displayValueTransformer: value => addressDisplayTransformer(value)
		},
		// Transaction's target address.
		{
			id: 'to_address',
			key: 'to',
			displayKey: 'To',
			formattedValueTransformer: value => value,
			displayValueTransformer: value => addressDisplayTransformer(value)
		},
		// Transaction's explicit transferred value (in Ether)
		{
			id: 'transaction_value_eth',
			key: 'value',
			displayKey: 'ETH',
			formattedValueTransformer: value => weiToEther(value),
			displayValueTransformer: (_, formattedValue) => formattedValue == 0 ? '' 
				: maskLongNumberValue(formattedValue)
		},
		// Transaction's explicit transferred value in USD
		{
			id: 'transaction_value_usd',
			key: 'value',
			displayKey: 'USD',
			formattedValueTransformer: (value, { timeStamp }) => 
				valueExchangeTransformer(timeStamp, 'USD', weiToEther(value)),
			displayValueTransformer: (_, formattedValue) => formattedValue.toFixed(2)
		},
		// Transaction's explicit transferred value in Bitcoin
		{
			id: 'transaction_value_btc',
			key: 'value',
			displayKey: 'BTC',
			formattedValueTransformer: (value, { timeStamp }) => 
				valueExchangeTransformer(timeStamp, 'BTC', weiToEther(value)),
			displayValueTransformer: (_, formattedValue) => maskLongNumberValue(formattedValue)
		},
	]
}

const buildColumns = ({
	usdExchangeRate,

	addressDisplayTransformer,
	valueExchangeTransformer
}) => {

	let columnKeys = getKeyDefs({addressDisplayTransformer, valueExchangeTransformer})
	let columns = []

	for(let ck of columnKeys) {

		// TODO: abstract default.
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
			case 'timestamp':
				column.sortOrder = 'descend'
				column.sorter = (a, b) => a.timeStamp - b.timeStamp
				break

			case 'from_address':
			case 'to_address':
				column.render = value => {
					return (
						<div className="editable-cell">
							<div className="editable-cell-text-wrapper">
								{ck.displayValueTransformer(value)}
								<ClickCopyCell text={ck.formattedValueTransformer(value)} />
							</div>
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