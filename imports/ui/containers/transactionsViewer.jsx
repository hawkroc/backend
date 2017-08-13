import React from 'react';
import { connect } from 'react-redux';

import TransactionsGridComponent from '../components/transactions/transactionsGrid'

const View = () => (
    <div>
        <TransactionsGridComponent />
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