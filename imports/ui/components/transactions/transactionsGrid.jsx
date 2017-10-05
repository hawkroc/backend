import React from 'react'
import { Table } from 'antd'

import coreDefinitions from '../../../modules/core/definitions'

import taxationDefinitions from '../../../modules/taxation/definitions'
import labellingDefinitions from '../../../modules/transaction-labelling/definitions'

/**
 * Presents a grid showing transaction information.
 * 
 */


const View = ({
	transactions,
	usdExchangeRate,
	activeProfile,

	addressDisplayTransformer,
	valueExchangeTransformer
}) => {

	let columns = coreDefinitions.buildColumns({
		usdExchangeRate,
		addressDisplayTransformer,
		valueExchangeTransformer
	})
	
	// TODO: no magic numbers.
	const height = window.innerHeight - 320
	
	// Same for the labelling module.
	if (activeProfile.isModuleEnabled('transaction-labelling')) {
		let transactionLabellingModule = activeProfile.getModule('transaction-labelling')
	
		columns = columns.concat(labellingDefinitions.buildColumns({
			transactionLabellingModule
		}))
	}

	// If the taxation module is enabled for this profile - build the extra
	// required transaction grid columns and appropriately transform the
	// transactions list with the required fields.
	if (activeProfile.isModuleEnabled('taxation')) {
		let taxationModule = activeProfile.getModule('taxation')
		columns = columns.concat(taxationDefinitions.buildColumns({
			taxationModule
		}))
	}

	return (
		<div className="tableList">
			<Table
				columns={ columns }
				dataSource={ transactions }
				rowKey={ transaction => transaction._id }
				pagination={{ pageSize: 50 }}
				scroll={{ y: height }}
			/>
		</div>
	)
}

export default View
