import React from 'react'
import { connect } from 'react-redux'

import { Row, Col, Button, notification } from 'antd'

import TrackedAccounts from '../components/trackedAccounts'
import TransactionLabels from '../components/transactionLabels'


/**
 * Container for configuring high-level application settings.
 * 
 */
const View = () => (
    <div>
        <Row>
            <Col offset={1} span={10}>
                <TrackedAccounts />
            </Col>
            <Col offset={1} span={9}>
                <TransactionLabels />
            </Col>
        </Row>
    </div>
)

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, state) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)