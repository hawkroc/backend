import React from 'react'
import { Select } from 'antd'
import ClickCopyCell from '../common/clickCopyCell'

const weiToEther = value => value * Math.pow(10, -18)

const maskLongNumberValue = value => {
    return value.toString().length > 8 
        ? value.toString().substring(0, 8) + '...'
        : value.toString()
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
	// get that day's rate
	const getExchangeDataCurrency = (date, currencyCollection) => {
		return currencyCollection.rates.filter(a => {
			let time = new Date(parseInt(a.time)).toLocaleDateString()
			return time === date
		})
	}
	// get the rate list base on different digitalCurrency name
	const getCurrencyBaseOnChoose = (digitalCurrency) => {
		let currency = currencies.filter(a => {
			return a.digitalCurrency === digitalCurrency
		})
		return currency[0]
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

						<ClickCopyCell text={text}/>
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
						<ClickCopyCell text={text}/>
					</div>
				</div>
			)
		},
		{
			title: 'ETH',
			dataIndex: 'value',
			key: 'value',
			width: '6%',

			render: (text, record) => {
				return maskLongNumberValue(weiToEther(text))
			}
		},
		{
			title: 'USD',
			dataIndex: 'value',
			key: 'valueUsd',
			width: '4%',
			render: (text, record) => {
				let tp = new Date(
					parseInt(record.timeStamp) * 1000
				).toLocaleDateString()
				let rate = []
				if (currencies) {
					let currency = getCurrencyBaseOnChoose('ETH')
					if (currency) {
						rate = getExchangeDataCurrency(tp, currency)
					}
				}
				return (weiToEther(text) * (rate[0] ? rate[0].average : 0)).toFixed(2)
			}
		},
		{
			title: 'BTC',
			dataIndex: 'value',
			key: 'valueBtc',
			width: '5%',

			render: (text, record) => {
				let tp = new Date(
					parseInt(record.timeStamp) * 1000
				).toLocaleDateString()
				let rate = 0
				let rateETH = []
				let rateBTC = []
				if (currencies) {
					let currencyETH = getCurrencyBaseOnChoose('ETH', currencies)
					if (currencyETH) {
						rateETH = getExchangeDataCurrency(tp, currencyETH)
					}
					let currencyBTC = getCurrencyBaseOnChoose('BTC', currencies)
					if (currencyBTC) {
						rateBTC = getExchangeDataCurrency(tp, currencyBTC)
						if (rateBTC.length !== 0 && rateETH.length !== 0) {
							if (rateETH) {
								rate = rateETH[0].average / rateBTC[0].average
							}
						}
					}
				}
				return maskLongNumberValue(weiToEther(text) * rate * 1000)
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
