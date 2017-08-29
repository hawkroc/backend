import React from 'react'

import { Table, Button } from 'antd';

import { buildColumns } from './transactionLabelsColumns'

/**
 * Presents a grid containing labels associable with transactions.
 * 
 *  TODO: editable cells.
 */
 const View = ({
    //language config
    languageConfig,
    // Collection of existing transaction labels to display.
    labelTypes,
    onUpdateLabelType,
    onInsertLabelType,
    onDeleteLabelType
 }) => {

    const columns = buildColumns({languageConfig,onUpdateLabelType, onDeleteLabelType});

     return (
        <div>
            <h2>{languageConfig.Transaction_labels}</h2>
            <br />
            <Table bordered 
                rowKey={label => label._id}
                dataSource={labelTypes} 
                columns={columns} />
            <Button className="editable-add-btn"
                onClick={() => onInsertLabelType({ name: languageConfig.New_label, gst: false })}> {languageConfig.Add_label}</Button>
        </div>
     )
 }

 export default View;