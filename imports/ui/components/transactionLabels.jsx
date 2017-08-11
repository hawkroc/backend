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

    onUpdateLabelType,
    onInsertLabelType
 }) => {

    const columns = buildColumns({onUpdateLabelType});

     return (
        <div>
            <h2>Transaction labels</h2>
            <br />
            <Table bordered 
                rowKey={label => label._id}
                dataSource={labelTypes} 
                columns={columns} />
            <Button className="editable-add-btn"
                onClick={() => onInsertLabelType({ name: "New label", gst: false })}>Add label</Button>
        </div>
     )
 }

 export default View;