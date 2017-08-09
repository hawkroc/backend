import React from 'react'

import { Tabs } from 'antd'
const { TabPane } = Tabs;

import TransactionsViewer from '../containers/transactionsViewer'
import TransactionsReporting from '../containers/transactionsReporting'
import ApplicationSettings from '../containers/applicationSettings'


/**
 * Body row layout for display of content.
 * 
 */
 const Layout = () => {
     return (
        <div>
            <Tabs defaultActiveKey="0" >
                <TabPane tab="Transactions" key="0">
                    <TransactionsViewer />
                    {/* <TransactionList promise={this.state.promise} config={this.state.config}/> */}
                </TabPane>
                <TabPane tab="Reporting" key="1">
                    <TransactionsReporting />
                    {/* <LineChart /> */}
                </TabPane>
                <TabPane tab="Account Settings" key="2">
                    <ApplicationSettings />
                    {/* <SetAll changeConfig={this.changeConfig} config={this.state.config}/> */}
                </TabPane>
            </Tabs>
        </div>
     )
 }

 export default Layout;