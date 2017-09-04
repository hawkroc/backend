import axios from 'axios'
import Accounts from '../imports/api/accounts/accounts'
const base = 'http://api.etherscan.io/api?'
const accountUrl = 'module=account&action=txlist&address='
const currentBlock = 'module=proxy&action=eth_blockNumber'
const config = require('../imports/config/config')

/* global Meteor, Session */
/**
 * Query API for the current head block.
 * 
 */
const getCurrentBlock = () => {
	let final = base + currentBlock + config.key

	return axios.get(final).then(response => {
		response.data.result = parseInt(response.data.result, 16)

		return response
	})
}

/** 
 * Fetch transaction data from the API.
 * 
 */
const getdataFromApi = (startblock, endblock, address) => {
	let final =
				base +
				accountUrl +
				address +
				'&startblock=' +
				startblock +
				'&endblock=' +
				endblock +
				'&sort=asc' +
				config.key

	console.log('synchronizeData: Fetching remote data:', final)

	return axios.get(final).then(response => {
		return response
	})
}

/**
 * get balance from api only if there new transactions  it be invoked
 */
const balanceUrl =
		'https://api.etherscan.io/api?module=account&action=balance&tag=latest' +
		config.key +
		'&address='
export const getBalance = address => {
	let final = balanceUrl + address
	return axios
		.get(final)
		.then(response => {
			return response
		})
		.catch(error => {
			throw error
		})
}

/**
 * Fetch data up to the latest block.
 * 
 */
export const synchronizeDataFromApi = () => {
	getCurrentBlock().then(response => {
		let endBlock = response.data.result

		// Pull a list of unique addresses.
		let accountsList = Accounts.find().map(a => ({
			_id: a._id,
			address: a.address,
			latestMinedBlock: a.latestMinedBlock
		}))

		console.log(
			'synchronizeData: Mining account data for',
			accountsList.length,
			'accounts.'
		)

		for (let account of accountsList) {
			console.log(
				'synchronizeData: Mining account data for account with _id',
				account._id,
				'with address',
				account.address
			)

			getdataFromApi(account.latestMinedBlock + 1, endBlock, account.address)
				.then(responseFromApi => {
					// TODO: validation and error checking.

					let res = responseFromApi.data.result
					console.log(
						'synchronizeData: Remote fetch returned',
						res.length,
						'records.'
					)

					if (res.length === 0) {
						// No new data.
						return true
					}
					// if there new Transactions we will update the balance
					getBalance(account.address).then(responseBalance => {
						Accounts.update(account._id, {
							$set: {
								// TODO: should this be latest block from API call?
								balance: responseBalance.data.result
							}
						})
					})

					// Filter out duplicate transactions
					// TODO: this could be done better by making sure the mining process never overlaps.
					res = res.filter(t => t.blockNumber >= account.latestMinedBlock)

					// Attach an object ID to each transaction.
					res.forEach(t => {
						t._id = new Meteor.Collection.ObjectID().toHexString()
					})

					// Push the new transcations to the account.
					// TODO: we should do some validation checking to make sure we don't duplicate any
					// transactions. This would also be achieved through robust error handling too.
					Accounts.update(account._id, {
						$push: {
							transactions: {
								$each: res
							}
						}
					})

					// Successful transaction import? Update latest block.
					Accounts.update(account._id, {
						$set: {
							// TODO: should this be latest block from API call?
							latestMinedBlock: res.slice(-1)[0].blockNumber
						}
					})

					return true
				})
				.catch(e => {
					console.log('synchronizeData:', e)
					return false
				})
				.finally(() => {
					console.log('synchronizeData: Remote fetch completed.')
				})
		}
	})
}
