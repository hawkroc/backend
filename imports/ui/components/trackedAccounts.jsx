import React from 'react'

import { Table, Button, Popconfirm } from 'antd'
import { buildColumns } from './trackedAccountsColumns'

/**
 * Presents a grid containing accounts currently tracked by the application.
 * 
 *  TODO: editable cells.
 * 
 */
const View = ({
    // Collection of accounts to display.
    trackedAccounts,

    // Called when the UI requests a change to account information.
    onUpdateTrackedAccount
}) => {

    // Build the column set for this table.
    const columns = buildColumns({onUpdateTrackedAccount})

    return (
        <div>
            <h2>Tracked accounts</h2>
            <br />
            <Table bordered 
                rowKey={account => account._id}
                dataSource={trackedAccounts}
                columns={columns}
            />
            <Button className="editable-add-btn" 
                onClick={() => alert("Handle add tracked account")}>Add account
            </Button>
        </div>
    )
}

export default View