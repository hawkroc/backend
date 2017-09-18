import React from 'react'
import { Table } from 'antd'

import { buildColumns } from './transactionsGridColumns'
import taxationColumns from './transactionsGridTaxationColumns'
import { transformTransactions } from './transactionsTaxationTransformer'


/**
 * Presents a grid showing transaction information.
 * 
 */
const View = ({
	accounts,
	addressAliasLookup,
	usdExchangeRate,
	labelTypes,
	transactionLabels,
	currencies,
	activeProfile,

	onLabelUpdated
}) => {
	// Flatten transactions for all our tracked accounts.
	let transactionsDataSource = [].concat.apply([], accounts.map(a => a.transactions))

	let columns = buildColumns({
		addressAliasLookup,
		usdExchangeRate,
		labelTypes,
		onLabelUpdated,
		currencies,
		transactionLabels
	})

	// If the taxation module is enabled for this profile - build the extra
	// required transaction grid columns and appropriately transform the
	// transactions list with the required fields.
	if (activeProfile.isModuleEnabled('taxation')) {
		let taxationModule = activeProfile.getModule('taxation')
		columns = columns.concat(taxationColumns.buildColumns({
			taxationModule
		}))

		transactionsDataSource = transformTransactions(transactionsDataSource, taxationModule)
	}

	return (
		<div className="tableList">
			<Table
				columns={ columns }
				dataSource={ transactionsDataSource }
				rowKey={ transaction => transaction._id }
				pagination={{ pageSize: 6 }}
			/>
		</div>
	)
}

export default View
