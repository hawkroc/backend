import React from 'react'

import { Table,Button } from 'antd'

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
    getExchange,
    transactionLabels,
    onLabelUpdated
 }) => {

    // Flatten transactions for all our tracked accounts.

    const gridDataSource = [].concat.apply([], accounts.map(a => a.transactions))
    const gridColumns = buildColumns({
        addressAliasLookup, 
        usdExchangeRate, 
        labelTypes, 
        onLabelUpdated, 
        transactionLabels
    });

    return (
        <div>
        <div className="exchange">1 ETH = {usdExchangeRate}USD
       <Button onClick={getExchange}>Primary</Button>
       </div>
        <div className="tableList">
            <Table 
                columns={gridColumns}
                dataSource={gridDataSource}
                rowKey={transaction => transaction._id}
                pagination={{ pageSize: 7 }}
            />
        </div>
        </div>
    )
 }





 export default View;