import React from 'react'

import { Tabs } from 'antd'
const { TabPane } = Tabs;

import TransactionsViewer from '../containers/transactionsViewer'
import TransactionsReporting from '../containers/transactionsReporting'
import ApplicationSettings from '../containers/applicationSettings'

``
/**
 * Body row layout for display of content.
 * 
 */
 const Layout = ({languageConfig}) => {

     return (
        <div>
           
            <Tabs defaultActiveKey="0" >
                <TabPane tab={languageConfig.Transactions_title} key="0">
                    <TransactionsViewer />
                    {/* <TransactionList promise={this.state.promise} config={this.state.config}/> */}
                </TabPane>
                <TabPane tab={languageConfig.Reporting_title} key="1">
                    <TransactionsReporting {...{languageConfig}} />
                    {/* <LineChart /> */}
                </TabPane>
                <TabPane tab={languageConfig.Settings_title} key="2"> 
                    <ApplicationSettings  {...{languageConfig}} />
                    {/* <SetAll changeConfig={this.changeConfig} config={this.state.config}/> */}
                </TabPane>
            </Tabs>
           
        </div>
     )
 }

 export default Layout;