import { Meteor } from "meteor/meteor";

import { Table, Button, Tabs } from "antd";
import { buildColumns } from "./labelTypeEditorColumns";
import { buildColumnsTaxCode } from "./taxCodeColumns";
import methodTypes from "../../modules/transaction-labelling/methodTypes";
import methodTypesTax from "../../modules/taxation/methodTypes.js";
const { TabPane } = Tabs;

import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export default class LableRateEditor extends PureComponent {

	constructor(args) {
		super(args)

		// Local state for minor changes.
		this.state = {
			addModalVisible: false,
			validation: false,
			addTax: '',
			addRate: ''
		}
	}



  onUpdateLabelType = (updatedLabel) => {
    // Update the active profile's label.
    Meteor.call(methodTypes.PROFILE_UPDATE_LABELTYPE, {
      ...updatedLabel
    });
  }

  onInsertLabelType = (newLabel) => {
    Meteor.call(methodTypes.PROFILE_INSERT_LABELTYPE, {
      ...newLabel
    });
  }

  onDeleteLabelType = (label) => {
    Meteor.call(methodTypes.PROFILE_DELETE_LABELTYPE, {
      _id: label._id
    });
  }

  onUpdateTaxRate = (updatedRate) => {
    // Update the active profile's label.
    Meteor.call(methodTypesTax.PROFILE_MODULE_TAXATION_UPDATETAXCODE, {
      ...updatedRate
    });
  }

  onInsertTaxRate = (newRate) => {
    Meteor.call(methodTypesTax.PROFILE_MODULE_TAXATION_INSERTTXTAXCODE, {
      newRate
    });
  }

  onDeleteTaxRate = (rate) => {
    Meteor.call(methodTypesTax.PROFILE_MODULE_TAXATION_DELETETXTAXCODE, {
      _id: rate._id
    });
  }

  render() {
    // language config
    const {
      languageConfig,
      // Collection of existing transaction labels to display.
      taxationModule,
      transactionLabellingModule
    } = this.props;

    const columns = buildColumns({
	  languageConfig,
      onUpdateLabelType:this.onUpdateLabelType,
      onDeleteLabelType:this.onDeleteLabelType
    });
    const columnsTaxCode = buildColumnsTaxCode({
      languageConfig,
      onUpdateTaxRate:this.onUpdateTaxRate,
      onDeleteTaxRate:this.onDeleteTaxRate
    });

    return (
      <div>
        <Tabs defaultActiveKey="0">
          <TabPane tab={languageConfig.Transaction_labels} key="0">
            <Table
              bordered
              rowKey={label => label._id}
              pagination={{ pageSize: 5 }}
              dataSource={transactionLabellingModule.labelTypes.items}
              columns={columns}
            />
            <Button
              className="editable-add-btn"
              onClick={() =>
                onInsertLabelType({
                  label: languageConfig.New_label,
                  gst: false
                })}
            >
              {languageConfig.Add_label}
            </Button>
          </TabPane>

          <TabPane tab={languageConfig.Transaction_tax_code} key="2">
            <Table
              bordered
              rowKey={taxCodes => taxCodes._id}
              pagination={{ pageSize: 5 }}
              dataSource={taxationModule.taxCodes.items}
              columns={columnsTaxCode}
            />
            <Button
              className="editable-add-btn"
              onClick={() =>
                onInsertTaxRate({ label: languageConfig.New_TAX, rate: 0.08 })}
            >
              {languageConfig.New_TAX}
            </Button>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}
