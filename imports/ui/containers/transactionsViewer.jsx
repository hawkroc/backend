import { Meteor } from 'meteor/meteor'
import React from 'react'
import { connect } from 'react-redux'

import TransactionsGridComponent from '../components/transactions/transactionsGrid'
import { fetchEtherExchangeRate } from '../../redux/actions/accountActions'
import TransactionsExportComponent from '../components/transactions/transactionsExport'

class TransactionsViewer extends React.Component {
	componentDidMount() {
		this.props.fetchExchangeRate()
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
				<div className="exchange">
					<span style={{ color: 'black', fontStyle: 'italic' }}>
						{languageConfig.Current}:
					</span>{' '}
                    1 ETH = {usdExchangeRate} USD
				</div>
				<TransactionsExportComponent {...{ transactions }} />
				<TransactionsGridComponent
					{...{
						accounts,
						addressAliasLookup,
						usdExchangeRate,
						currencies,
						activeProfile
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
