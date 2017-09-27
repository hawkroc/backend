import React from 'react'
import { Table } from 'antd'

import coreDefinitions from '../../../modules/core/definitions'

import taxationDefinitions from '../../../modules/taxation/definitions'
import taxationTransformers from '../../../modules/taxation/transformers'

import labellingDefinitions from '../../../modules/transaction-labelling/definitions'
import labellingTransformers from '../../../modules/transaction-labelling/transformers'


/**
 * Presents a grid showing transaction information.
 * 
 */
const View = ({
	accounts,
	usdExchangeRate,
	activeProfile,

	addressDisplayTransformer,
	valueExchangeTransformer
}) => {
	// Flatten transactions for all our tracked accounts.
	let transactionsDataSource = [].concat.apply([], accounts.map(a => a.transactions))

	let columns = coreDefinitions.buildColumns({
		usdExchangeRate,

		addressDisplayTransformer,
		valueExchangeTransformer
	})

	// Same for the labelling module.
	if (activeProfile.isModuleEnabled('transaction-labelling')) {
		let transactionLabellingModule = activeProfile.getModule('transaction-labelling')
		columns = columns.concat(labellingDefinitions.buildColumns({
			transactionLabellingModule
		}))

		transactionsDataSource = labellingTransformers
			.transformTransactions(transactionsDataSource, transactionLabellingModule)
	}

	// If the taxation module is enabled for this profile - build the extra
	// required transaction grid columns and appropriately transform the
	// transactions list with the required fields.
	if (activeProfile.isModuleEnabled('taxation')) {
		let taxationModule = activeProfile.getModule('taxation')
		columns = columns.concat(taxationDefinitions.buildColumns({
			taxationModule
		}))

		transactionsDataSource = taxationTransformers.transformTransactions(
			transactionsDataSource, 
			taxationModule
		)
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
