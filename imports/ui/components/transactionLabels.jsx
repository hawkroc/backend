import React from 'react'

import { Table, Button, Popconfirm, Select } from 'antd';

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '40%',
        render: (text, record, index) => (
            text
        )
    }, 
    {
        title: 'GST',
        dataIndex: 'GST',
        width: '30%',
        render: (text, record, index) => { 
            return  (
                <div>
                    <Select value={record.gst ? "GST" : "NOGST"} 
                            defaultValue="true" 
                            onChange={() => alert("Handle label GST class change")}>
                        <Option value="true">GST</Option>
                        <Option value="false">NOGST</Option>
                    </Select>
                </div>
            )
        }
    }, 
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
            return (
                <Popconfirm 
                        title="Are you sure you want to delete this label?" 
                        onConfirm={() => alert("Handle label delete")}>
                    <a href="#">Delete</a>
                </Popconfirm>
            );
        }
    }];

/**
 * Presents a grid containing labels associable with transactions.
 * 
 *  TODO: editable cells.
 */
 const View = ({
    // Collection of existing transaction labels to display.
    transactionLabels
 }) => {
     return (
        <div>
            <h2>Transaction Labels:</h2>
            <Button className="editable-add-btn"
                onClick={() => alert("Handle adding label")}>Add</Button>
            <Table bordered 
                rowKey={label => label.name}
                dataSource={transactionLabels} 
                columns={columns} />
        </div>
     )
 }

 export default View;