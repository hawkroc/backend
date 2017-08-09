import React from 'react'

import { Table, Button, Popconfirm } from 'antd';

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '40%',
        render: (text, record, index) => (
            time
        )
    }, 
    {
        title: 'GST',
        dataIndex: 'GST',
        width: '30%',
        render: (text, record, index) =>{ 
        return  (
            <div>
                <Select value={text} 
                        defaultValue="true" 
                        onChange={() => alert("Handle label GST class change")}>
                    <Option value="true">GST</Option>
                    <Option value="false">NOGST</Option>
                </Select>
            </div>
        )}
    }, 
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
            return (
                this.state.dataSource.length > 0 ?
                (
                    <Popconfirm 
                            title="Sure to delete?" 
                            onConfirm={() => alert("Handle label delete")}>
                        <a href="#">Delete</a>
                    </Popconfirm>
                ) : null
            );
        }
    }];

/**
 * Presents a grid containing labels associable with transactions.
 * 
 *  TODO: editable cells.
 */
 const View = ({
    
 }) => {
     return (
        <div>
            <h2>Transaction Labels:</h2>
            <Button className="editable-add-btn"
                onClick={() => alert("Handle adding label")}>Add</Button>
            <Table bordered dataSource={[]} columns={columns} />
        </div>
     )
 }

 export default View;