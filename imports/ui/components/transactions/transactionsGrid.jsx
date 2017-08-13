import React from 'react'

import { Table } from 'antd'

import gridColumns from './transactionsGridColumns'
const gridDataSource = []

/**
 * Presents a grid showing transaction information.
 * 
 */
 const View = ({
    transactions
 }) => {
     return (
        <div>
            <Table 
                columns={gridColumns}
                dataSource={gridDataSource}
            />
        </div>
     )
 }

 export default View;