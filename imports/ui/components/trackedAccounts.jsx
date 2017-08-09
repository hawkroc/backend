import React from 'react'

import { Table, Button, Popconfirm } from 'antd';

const columns = [
    {
        title: 'name',
        dataIndex: 'name',
        width: '30%',
        render: (text, record, index) => (
            text
        )
    }, 
    {
        title: 'address',
        dataIndex: 'address',
        width: '30%',
        render: (text, record, index) => (
            text
        )
    },
    {
        title: 'balance',
        dataIndex: 'balance',
        width: '30%',
        render: (text, record, index) => {
            text
        },
        
    },
    {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record, index) => {
        return (
            this.state.dataSource.length > 0 ?
            (
                <Popconfirm 
                        title="Are you sure you want to stop tracking this account?" 
                        onConfirm={() => this.onDelete(index)}>
                    <a href="#">Remove</a>
                </Popconfirm>
            ) : null
        );
    },
}];

/**
 * Presents a grid containing accounts currently tracked by the application.
 * 
 *  TODO: editable cells.
 */
 const View = ({
    
 }) => {
     return (
        <div>
            <h2>Tracked accounts:</h2>
            <Button className="editable-add-btn" 
                onClick={() => alert("Handle add tracked account")}>Add
            </Button>
            <Table bordered dataSource={[]} columns={columns} />
        </div>
     )
 }

 export default View;