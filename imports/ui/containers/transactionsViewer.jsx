import { Meteor } from 'meteor/meteor'
import React from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'antd'

import TransactionsGridComponent from '../components/transactions/transactionsGrid'
import TransactionsExportComponent from '../components/transactions/transactionsExport'
import TransactionsFilterContainer from '../containers/transactionsFilter'

import { fetchEtherExchangeRate } from '../../redux/actions/accountActions'

class TransactionsViewer extends React.Component {
	constructor(args) {
		super(args)
		this.state = {
			count: 60,	
		}
	}

	tick() {
		if (this.state.count - 1 < 0) {
			// this.updateConvertInfo();
			// this.updatePendingInfo();
		}
		this.setState({
			count: this.state.count - 1 < 0 ? 10 : this.state.count - 1
		});
	}
	startTimer() {
		clearInterval(this.timer);
		this.timer = setInterval(this.tick.bind(this), 1000);
	}
	stopTimer() { clearInterval(this.timer); }



	componentDidMount() {
		this.props.fetchExchangeRate()
		this.startTimer()
	}

	render() {
		const {
			usdExchangeRate,
			languageConfig,
			accounts,
			addressAliasLookup,
			currencies,
			activeProfile
		} = this.props

		const transactions = [].concat
			.apply([], accounts.map(a => a.transactions))

		return (
			<div>
				<Row>
					<Col span={4}>
						<TransactionsExportComponent {...{ transactions }} />
					</Col>
					<Col offset={5} span={6}>
						<TransactionsFilterContainer />
					</Col>
					<Col offset={3} span={5}>
						<div className="exchange">
							<span style={{ color: 'black', fontStyle: 'italic' }}>
								{languageConfig.Current}:
							</span>{'  '}
							1 ETH = {usdExchangeRate} USD
						</div>
					</Col>
				</Row>
				<TransactionsGridComponent
					{...{
						accounts,
						addressAliasLookup,
						usdExchangeRate,
						currencies,
						activeProfile
					}}
				/>
				<b>
				New data available in {this.state.count} seconds
			</b>
			</div>
		)
	}
}

const mapStateToProps = state => {
	// TODO: need to figure out how to wait for initial state from meteor
	// collections before rendering top-level components.

	let accounts = state.accounts.items
	let trackedAccounts = state.profiles.active.trackedAccounts

	// Create an account->tracked account lookup.
	let addressAliasLookup = accounts.map(
		a => ({
			_id: a._id,
			address: a.address,
			trackedAccount: trackedAccounts.find(
				tracked => tracked.accountId === a._id
			)
		})
	)

	return {
		accounts,
		addressAliasLookup,

		activeProfile: state.profiles.active,
		currencies: state.profiles.currencies,
		usdExchangeRate: state.accounts.usdExchangeRate,

		languageConfig: state.navigation.languageConfig
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchExchangeRate: () => {
			dispatch(fetchEtherExchangeRate())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsViewer)
