import React from 'react'

import { Row, Col } from 'antd'

import TransactionsFilterContainer from '../containers/transactionsFilter'

/**
 * Header row layout for control of content.
 * 
 */
 const Layout = () => {
     return (
        <div>
            <div className="inputSearch ">
                <Row>
                    <Col offset={1}  span={2}>
                        <div>
                            <img role="presentation" className="logo" />
                        </div>
                    </Col>
                    <Col offset={6} span={6}>
                        <TransactionsFilterContainer />
                    </Col>
                </Row>
            </div>
        </div>
     )
 }

 export default Layout;