import React from 'react'
import { Table } from 'antd'

import { buildColumns } from './transactionsGridColumns'
import taxationColumns from './transactionsGridTaxationColumns'
import labellingColumns from './transactionsGridLabellingColumns'
import { transformTransactions } from './transactionsTaxationTransformer'
import * as txLabellingTransformer from './transactionsLabellingTransformer'


/**
 * Presents a grid showing transaction information.
 * 
 */
const View = ({
	accounts,
	addressAliasLookup,
	usdExchangeRate,
	currencies,
	activeProfile
}) => {
	// Flatten transactions for all our tracked accounts.
	let transactionsDataSource = [].concat.apply([], accounts.map(a => a.transactions))

	let columns = buildColumns({
		addressAliasLookup,
		usdExchangeRate,
		currencies
	})

	// Same for the labelling module.
	if (activeProfile.isModuleEnabled('transaction-labelling')) {
		let transactionLabellingModule = activeProfile.getModule('transaction-labelling')
		columns = columns.concat(labellingColumns.buildColumns({
			transactionLabellingModule
		}))

		transactionsDataSource = txLabellingTransformer
			.transformTransactions(transactionsDataSource, transactionLabellingModule)
	}

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
				pagination={{ pageSize: 8 }} 
			/>
		</div>
	)
}

export default View
