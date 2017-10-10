import { Meteor } from "meteor/meteor";

import { Table, Button, Tabs,Modal,Input,message } from "antd";
import { buildColumns } from "./labelTypeEditorColumns"; 
import { buildColumnsTaxCode } from "./taxCodeColumns";
import methodTypes from "../../modules/transaction-labelling/methodTypes";
import methodTypesTax from "../../modules/taxation/methodTypes.js";
import { checkTaxRate } from '../../common/inputTransformationHelpers'
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

  showAddModal() {
		this.setState({ addModalVisible: true })
	}
	hideAddModal() {
		this.setState({
			addModalVisible: false,
			addTax: '',
			addRate: ''
		})
	}
	showErrorMessage = (info) => {
		message.error(info)
	}

	submitAdd = () => {
		const { addTax, addRate } = this.state

		let valdate=checkTaxRate(addRate)
		if(!valdate){
			this.showErrorMessage('Please input the correct Rate')
			return null
		}

		this.onInsertTaxRate({
			label: addTax,
			rate: addRate
		})

		this.hideAddModal()
		
	}


	handleAddTax = (e) => {
		this.setState({ addTax: e.target.value })
	}
	handleAddRate = (e) => {
		this.setState({ addRate: e.target.value })
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
	  onDeleteTaxRate:this.onDeleteTaxRate,
	  showErrorMessage:this.showErrorMessage
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
            this.onInsertLabelType({
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
          	  onClick={() => this.showAddModal()}
            >
              {languageConfig.New_TAX}
            </Button>

			<Modal
					title={languageConfig.New_TAX}
					visible={this.state.addModalVisible}
					onOk={() => this.submitAdd()}
					onCancel={() => this.hideAddModal()}
				>
					<h3 style={{ marginBottom: '8px' }}>{languageConfig.New_TAX}</h3>
					<Input size="small" placeholder="My new tax"
						value={this.state.addTax} onChange={this.handleAddTax} />
					<br />

					<h3>{languageConfig.Tax_Rate}</h3>
					<Input size="small" placeholder="0.08"
						value={this.state.addRate} onChange={this.handleAddRate} />
				</Modal>


          </TabPane>
        </Tabs>
      </div>
    );
  }
}
