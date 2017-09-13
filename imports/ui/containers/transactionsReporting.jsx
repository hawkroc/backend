import React from 'react'
import { connect } from 'react-redux'

import TransactionsChartComponent from '../components/transactions/transactionsChart'

const View = () => (
	<div>
		<TransactionsChartComponent />
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
