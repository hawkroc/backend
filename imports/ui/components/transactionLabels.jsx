import React from 'react'

import { Table, Button } from 'antd';

import { buildColumns } from './transactionLabelsColumns'

/**
 * Presents a grid containing labels associable with transactions.
 * 
 *  TODO: editable cells.
 */
 const View = ({
    // Collection of existing transaction labels to display.
    labelTypes,

    onUpdateLabelType
 }) => {

    const columns = buildColumns({onUpdateLabelType});

     return (
        <div>
            <h2>Transaction Labels</h2>
            <br />
            <Table bordered 
                rowKey={label => label.name}
                dataSource={labelTypes} 
                columns={columns} />
            <Button className="editable-add-btn"
                onClick={() => alert("Handle adding label")}>Add label</Button>
        </div>
     )
 }

 export default View;