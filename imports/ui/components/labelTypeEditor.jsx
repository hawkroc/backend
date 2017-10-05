import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Table, Button ,Tabs} from 'antd'
import { buildColumns } from './labelTypeEditorColumns'
import {buildColumnsTaxCode} from './taxCodeColumns'
import methodTypes from '../../modules/transaction-labelling/methodTypes'
import methodTypesTax from '../../modules/taxation/methodTypes.js'
const { TabPane } = Tabs
const onUpdateLabelType = (updatedLabel) => {
	// Update the active profile's label.
	Meteor.call(methodTypes.PROFILE_UPDATE_LABELTYPE, {
		...updatedLabel
	})
}

const onInsertLabelType = (newLabel) => {
	Meteor.call(methodTypes.PROFILE_INSERT_LABELTYPE, {
		...newLabel
	})
}

const onDeleteLabelType = (label) => {
	Meteor.call(methodTypes.PROFILE_DELETE_LABELTYPE, {
		_id: label._id
	})
}



const onUpdateTaxRate = (updatedRate) => {
	// Update the active profile's label.
	Meteor.call(methodTypesTax.PROFILE_MODULE_TAXATION_UPDATETAXCODE, {
		...updatedRate
	})
}

const onInsertTaxRate = (newRate) => {
	Meteor.call(methodTypesTax.PROFILE_MODULE_TAXATION_INSERTTXTAXCODE, {
		newRate
	})
}

const onDeleteTaxRate = (rate) => {
	Meteor.call(methodTypesTax.PROFILE_MODULE_TAXATION_DELETETXTAXCODE, {
		_id: rate._id
	})
}


/**
 * Presents a grid containing labels associable with transactions.
 * 
 *  TODO: editable cells.
 */
const View = ({
	// language config
	languageConfig,
	// Collection of existing transaction labels to display.
	taxationModule,
	transactionLabellingModule
}) => {
	const columns = buildColumns({languageConfig, onUpdateLabelType, onDeleteLabelType})
    const columnsTaxCode=buildColumnsTaxCode({languageConfig, onUpdateTaxRate, onDeleteTaxRate})
	return (
		<div>


<Tabs defaultActiveKey="0" >
				<TabPane tab={languageConfig.Transaction_labels} key="0">
			<Table bordered
				rowKey={label => label._id}
				dataSource={transactionLabellingModule.labelTypes.items}
				columns={columns} />
			<Button className="editable-add-btn"
				onClick={() => onInsertLabelType({ label: languageConfig.New_label, gst: false })}
			>
				{languageConfig.Add_label}
			</Button>
			</TabPane>

			<TabPane tab={languageConfig.Transaction_tax_code} key="2">
					

			<Table bordered
				rowKey={taxCodes => taxCodes._id}
				dataSource={taxationModule.taxCodes.items}
				columns={columnsTaxCode} />
			<Button className="editable-add-btn"
				onClick={() => onInsertTaxRate({ label: languageConfig.New_TAX, rate: 0.08 })}
			>
				{languageConfig.New_TAX}
			</Button>



				</TabPane>



			</Tabs>
		</div>
	)
}

export default View
