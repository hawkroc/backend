import React from 'react'

import {Row, Col} from 'antd'

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
						<TransactionsFilterContainer/>
					</Col>

					<Col offset={7} span={2}>
						<SwitchLanguageSettings/>
					</Col>

				</Row>
			</div>
		</div>
	)
}

export default Layout
