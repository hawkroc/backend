import React from 'react'
import { Accounts as UserAccounts } from 'meteor/accounts-base'

import { Row, Col, Button } from 'antd'

import TransactionsFilterContainer from '../containers/transactionsFilter'
import SwitchLanguageSettings from '../containers/switchLanguageSettings'

/**
 * Header row layout for control of content.
 *
 */
const Layout = () => {
	return (
		<div>
			<div className="inputSearch ">
				<Row>
					<Col offset={1} span={2}>
						<div>
							<img role="presentation" src="/img/blockeeper_Blue.png" className="logo"/>
						</div>
					</Col>
					<Col offset={6} span={6}>
						
					</Col>
					<Col offset={0} span={2} style={{float: "right"}}>
						<Button 
								type="primary" 
								onClick={e => UserAccounts.logout()} 
								style={{ width: "100px", margin: "3px" }}>
							Log out
						</Button>
					</Col>
					<Col offset={4} span={2} style={{float: "right"}}>
						<SwitchLanguageSettings/>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default Layout
