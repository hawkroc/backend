import { Meteor } from 'meteor/meteor'
import React from 'react'
import { connect } from 'react-redux'

import { Row, Col } from 'antd'

import TransactionsGridComponent from '../components/transactions/transactionsGrid'
import TransactionsExportComponent from '../components/transactions/transactionsExport'
import TransactionsFilterContainer from '../containers/transactionsFilter'

import coreDefinitions from '../../modules/core/definitions'
import taxationDefinitions from '../../modules/taxation/definitions'
import taxationTransformers from '../../modules/taxation/transformers'
import labellingDefinitions from '../../modules/transaction-labelling/definitions'
import labellingTransformers from '../../modules/transaction-labelling/transformers'

import { fetchEtherExchangeRate } from '../../redux/actions/accountActions'

class TransactionsViewer extends React.Component {
	componentDidMount() {
		this.props.fetchExchangeRate()
	}

	render() {
		const {
			usdExchangeRate,
			languageConfig,

			transactions,
			transactionKeyDefs,
			activeProfile,

			addressDisplayTransformer,
			valueExchangeTransformer,
		} = this.props

		return (
			<div>
				<Row>
					<Col span={4}> 
						<TransactionsExportComponent {...{ transactions, transactionKeyDefs }} />
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
						transactions,
						usdExchangeRate,
						activeProfile,

						addressDisplayTransformer,
						valueExchangeTransformer
					}}
				/>
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
	const addressAliasLookup = accounts.map(
		a => ({
			_id: a._id,
			address: a.address,
			trackedAccount: trackedAccounts.find(
				tracked => tracked.accountId === a._id
			)
		})
	)

	const addressDisplayTransformer = address => {
		let mapping = addressAliasLookup.find(a => a.address === address)
		if (mapping) {
			return mapping.trackedAccount ? mapping.trackedAccount.alias : null
		}
		return address.substring(0, 12) + '...'
	}

	const getExchangeRate = (timestamp, currencyIdentifier) => {
		let currencies = state.profiles.currencies
		
		let ratesSet = currencies.find(c => c.digitalCurrency === currencyIdentifier)
		if (!ratesSet) {
			// TODO: sensible default, such at current exchange rate.
			return { timestamp, value: 0.0, estimated: true }
		}

		const timestampDay = Math.floor(timestamp/86400)

		// Currently our rates are only daily.
		let rate = ratesSet.rates.find(r => Math.floor(r.timestamp/86400) === timestampDay)
		if (!rate) {
			// TODO: sensible default, such at current exchange rate.
			rate = { timestamp, value: 0.0, estimated: true }
		}

		return rate
	}

	// Get the most appropriate exchange rate for the timestamp and currency.
	// Then apply the selected rate to the passed base-currency value
	// TODO: need a better overall way to do this.
	const valueExchangeTransformer = (timestamp, currencyIdentifier, value) => {

		// Special logic for coercing multiple rates.
		if (currencyIdentifier === 'BTC') {
			const ethRate = getExchangeRate(timestamp, 'ETH')
			const btcRate = getExchangeRate(timestamp, 'BTC')
	
			// TODO: until we get our data integrity on point, don't risk making
			// silly calculations.
			if (!!ethRate.estimated || btcRate.estimated) {
				return 0
			}

			const ethBtcRate = ethRate.value / btcRate.value
			return value * ethBtcRate
		}
		else {
			return value * getExchangeRate(timestamp, currencyIdentifier).value
		}
	}

	const activeProfile = state.profiles.active

	let transactions = [].concat.apply([], accounts.map(a => a.transactions))
	let transactionKeyDefs = coreDefinitions.getKeyDefs({
		addressDisplayTransformer,
		valueExchangeTransformer
	})

	// Alow each module to transform the transactions list as required.

	if (activeProfile.isModuleEnabled('transaction-labelling')) {
		let transactionLabellingModule = activeProfile.getModule('transaction-labelling')
		transactions = labellingTransformers
			.transformTransactions(transactions, transactionLabellingModule)

		transactionKeyDefs = transactionKeyDefs.concat(
			labellingDefinitions.getKeyDefs(transactionLabellingModule)
		)
	}

	if (activeProfile.isModuleEnabled('taxation')) {
		let taxationModule = activeProfile.getModule('taxation')
		transactions = taxationTransformers.transformTransactions(
			transactions, 
			taxationModule
		)

		transactionKeyDefs = transactionKeyDefs.concat(
			taxationDefinitions.getKeyDefs(taxationModule)
		)
	}

	// TODO: should transaction formatted/display values be calculted once here too?

	return {
		transactions,
		transactionKeyDefs,
		activeProfile,
		usdExchangeRate: state.accounts.usdExchangeRate,

		languageConfig: state.navigation.languageConfig,

		addressDisplayTransformer,
		valueExchangeTransformer
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
