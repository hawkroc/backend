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
 const Layout = ({language_config}) => {

     return (
        <div>
           
            <Tabs defaultActiveKey="0" >
                <TabPane tab={language_config.Transactions_title} key="0">
                    <TransactionsViewer />
                    {/* <TransactionList promise={this.state.promise} config={this.state.config}/> */}
                </TabPane>
                <TabPane tab={language_config.Reporting_title} key="1">
                    <TransactionsReporting {...{language_config}} />
                    {/* <LineChart /> */}
                </TabPane>
                <TabPane tab={language_config.Settings_title} key="2"> 
                    <ApplicationSettings  {...{language_config}} />
                    {/* <SetAll changeConfig={this.changeConfig} config={this.state.config}/> */}
                </TabPane>
            </Tabs>
           
        </div>
     )
 }

 export default Layout;