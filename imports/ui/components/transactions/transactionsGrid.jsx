import React from 'react'

import { Table } from 'antd'

import { buildColumns } from './transactionsGridColumns'
/**
 * Presents a grid showing transaction information.
 * 
 */
 const View = ({
    accounts,
    addressAliasLookup,
    usdExchangeRate,
    labelTypes,
    transactionLabels,
    currencies,
    onLabelUpdated
 }) => {

    // Flatten transactions for all our tracked accounts.
    const gridDataSource = [].concat.apply([], accounts.map(a => a.transactions))

    const gridColumns = buildColumns({
        addressAliasLookup, 
        usdExchangeRate, 
        labelTypes, 
        onLabelUpdated, 
        currencies,
        transactionLabels
    });
 
    return (
        <div className="tableList">
            <Table 
                columns={gridColumns}
                dataSource={gridDataSource}
                rowKey={transaction => transaction._id}
                pagination={{ pageSize: 6 }}
            />
        </div>
    )
 }





 export default View;