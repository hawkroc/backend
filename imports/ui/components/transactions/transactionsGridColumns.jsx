import React from 'react'
import { Select } from 'antd'
import ClickCopyCell from '../common/clickCopyCell'

const weiToEther = value => (value * Math.pow(10, -18))

const maskLongNumberValue = value => {
	// Fix values to avoid automatic conversion to scientific notation.
	const fixed = value.toFixed(16)

    return fixed.toString().length > 8 
        ? fixed.toString().substring(0, 8) + '...'
        : fixed.toString()
}

export const buildColumns = ({
	addressAliasLookup,
	usdExchangeRate,
	currencies
}) => {
	// Mask an account address with an alias if found.
	// Otherwise default to its address.
	const accountAliasMask = address => {
		let mapping = addressAliasLookup.find(a => a.address === address)
		if (mapping) {
			return mapping.trackedAccount ? mapping.trackedAccount.alias : null
		}
		return address.substring(0, 12) + '...'
	}

	// Get the most appropriate exchange rate for the timestamp and currency. 
	const getExchangeRate = (timestamp, currencyIdentifier) => {
		
		let ratesSet = currencies.find(c => c.digitalCurrency === currencyIdentifier)
		if (!ratesSet) {
			// TODO: sensible default, such at current exchange rate.
			return { timestamp, value: 0.0, estimated: true }
		}

		const timestampDay = Math.floor(timestamp/86400)

		// Currently our rates are only daily.
		let rate = ratesSet.rates.find(r => Math.floor(r.timestamp/86400) === timestampDay)
		if (!rate) {
			// TODO: sensible default, such at current exchange rate.
			rate = { timestamp, value: 0.0, estimated: true }
		}

		return rate
	}

	return [
		{
			title: 'Time',
			dataIndex: 'timeStamp',
			key: 'timeStamp',
			width: '4%',
			sortOrder: 'descend',

			render: text => {
				return new Date(parseInt(text) * 1000).toLocaleDateString()
			},

			sorter: (a, b) => a.timeStamp - b.timeStamp
		},
		{
			title: 'From',
			dataIndex: 'from',
			key: 'from',
			width: '7%',

			render: (text, record) => (
				<div className="editable-cell">
					<div className="editable-cell-text-wrapper" id={record._id}>
						{accountAliasMask(text)}

						<ClickCopyCell text={text} />
					</div>
				</div>
			)
		},

		{
			title: 'To',
			dataIndex: 'to',
			key: 'to',
			width: '7%',

			render: (text, record) => (
				<div className="editable-cell">
					<div className="editable-cell-text-wrapper" id={record._id}>
						{accountAliasMask(text)}
						<ClickCopyCell text={text} />
					</div>
				</div>
			)
		},
		{
			title: 'ETH',
			dataIndex: 'value',
			key: 'value',
			width: '6%',

			render: (value, record) => {
				if (value == 0) return ''
				return maskLongNumberValue(weiToEther(value))
			}
		},
		{
			title: 'USD',
			dataIndex: 'value',
			key: 'valueUsd',
			width: '4%',
			render: (value, record) => {
				if (value == 0) return ''
				let rate = getExchangeRate(record.timeStamp, 'ETH')
				return (weiToEther(value) * rate.value).toFixed(2)
			}
		},
		{
			title: 'BTC',
			dataIndex: 'value',
			key: 'valueBtc',
			width: '5%',

			render: (value, record) => {
				if (value == 0) return ''
				// TODO: not the place for calcs like this.
				const ethRate = getExchangeRate(record.timeStamp, 'ETH')
				const btcRate = getExchangeRate(record.timeStamp, 'BTC')

				// TODO: until we get our data integrity on point, don't risk making
				// silly calculations.
				if (!!ethRate.estimated || btcRate.estimated) {
					return "N/A"
				}

				const ethBtcRate = ethRate.value / btcRate.value
				return maskLongNumberValue(weiToEther(value) * ethBtcRate)
			}
		},

		{
			title: 'Internal',
			dataIndex: 'contractAddress',
			key: 'contractAddress',
			width: '4%',

			render: text => {
				return text === '' ? '' : 'Internal'
			},

			filters: [{ text: 'No', value: 'No' }, { text: 'Yes', value: 'Yes' }],
			onFilter: (value, record) => {
				record.contractAddress.includes(value)
			}
		}
	]
}
