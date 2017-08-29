import React from 'react'

import { Table, Button, Popconfirm, Modal, Input } from 'antd'
import { buildColumns } from './trackedAccountsColumns'

/**
 * Presents a grid containing accounts currently tracked by the application.
 * 
 *  TODO: editable cells.
 * 
 */
class TrackedAccountsComponent extends React.Component {
    
    constructor(args) {
        super(args)

        // Local state for minor changes.
        this.state = {
            addModalVisible: false,
            addAlias: "",
            addAddress: ""
        }
    }

    showAddModal() {
        this.setState({ addModalVisible: true })
    }

    hideAddModal() {
        this.setState({ 
            addModalVisible: false,
            addAlias: "",
            addAddress: "" 
        })
    }

    handleAddAliasChange = (e) => {
        this.setState({ addAlias: e.target.value });
    }

    handleAddAddressChange = (e) => {
        this.setState({ addAddress: e.target.value });
    }

    submitAdd = () => {
        this.props.onInsertTrackedAccount({
            alias: this.state.addAlias, 
            address: this.state.addAddress
        })

        this.hideAddModal()
    }
    
    render() {
        const {
            //language
            languageConfig,
            // Collection of accounts to display.
            trackedAccounts,
            idToAddressBalance,
            // Called when the UI requests a change to account information.
            onUpdateTrackedAccount,
            onInsertTrackedAccount,
            onDeleteTrackedAccount

        } = this.props

        // Build the column set for this table.
        const columns = buildColumns({languageConfig,onUpdateTrackedAccount, onDeleteTrackedAccount,idToAddressBalance})

        return (
            <div>
                <h2>{languageConfig.Tracked_accounts}</h2>
                <br />
                <Table bordered 
                    rowKey={account => account._id}
                    dataSource={trackedAccounts}
                    columns={columns}
                />
                <Button className="editable-add-btn" 
                    onClick={() => this.showAddModal()}>{languageConfig.Add_Account}
                </Button>
                <Modal
                    title={languageConfig.Track_new_account}
                    visible={this.state.addModalVisible}

                    onOk={() => this.submitAdd()}
                    onCancel={() => this.hideAddModal()}
                >
                    <h3 style={{marginBottom: "8px"}}>{languageConfig.Account_alias}</h3>
                    <Input size="large" placeholder="My new account" 
                        value={this.state.addAlias} onChange={this.handleAddAliasChange} />
                    <br />

                    <h3>{languageConfig.Account_address}</h3>
                    <Input size="large" placeholder="0x..." 
                        value={this.state.addAddress} onChange={this.handleAddAddressChange} />
                </Modal>
            </div>
        )
    }
}

export default TrackedAccountsComponent