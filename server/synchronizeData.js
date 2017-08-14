const base = "http://api.etherscan.io/api?"
const accountUrl = "module=account&action=txlist&address=";
const currentBlock = "module=proxy&action=eth_blockNumber";

const config = require('../imports/config/config');
const axios = require('axios');

import Accounts from '../imports/api/accounts/accounts';

// Simple lock to ensure we don't start mining an account multiple times
// i.e. if we're inserting a lot of data.
let MINING_PROCESS_LOCK = false;

/**
 * Query API for the current head block.
 * 
 */
const getCurrentBlock = () => {
	let final = base + currentBlock + config.key;
	
	return axios
		.get(final)
		.then((response) => {
			response.data.result = parseInt(response.data.result, 16);
			
			return response;
		});
}

/** 
 * Fetch transaction data from the API.
 * 
 */
const getdataFromApi = (startblock, endblock, address) => {
	let final = base + accountUrl + address + "&startblock=" + startblock + 
		"&endblock=" + endblock + "&sort=asc" + config.key;

	console.log("synchronizeData: Fetching remote data:", final);

	return axios
		.get(final)
		.then((response) => {
			return response;
		})
};

/**
 * Fetch data up to the latest block.
 * 
 */
synchronizeDataFromApi = () => {

	if (MINING_PROCESS_LOCK) {
		console.log("synchronizeData: Mining process already active - skipping.")
		return;
	}

	MINING_PROCESS_LOCK = true;

	return getCurrentBlock().then((response) => {
		let endBlock = response.data.result;

		// Pull a list of unique addresses.
		let accountsList = Accounts.find()
			.map(a => ({ _id: a._id, address: a.address, latestMinedBlock: a.latestMinedBlock }))

		console.log("synchronizeData: Mining account data for", accountsList.length, "accounts.")

		for (let account of accountsList) {
			console.log("synchronizeData: Mining account data for account with _id", account._id,
				"with address", account.address);

			getdataFromApi(account.latestMinedBlock + 1, endBlock, account.address)
				.then((response) => {

					// TODO: validation and error checking.

					let res = response.data.result;
					console.log("synchronizeData: Remote fetch returned", res.length, "records.");

					if (res.length === 0) {
						// No new data.
						return;
					}

					res.forEach(t => {
						t._id = new Meteor.Collection.ObjectID().toHexString()
					});

					// Push the new transcations to the account.
					// TODO: we should do some validation checking to make sure we don't duplicate any
					// transactions. This would also be achieved through robust error handling too.
					Accounts.update(account._id, {
						$push: {
							'transactions': {
								$each: res
							}
						}
					})

					// Successful transaction import? Update latest block.
					Accounts.update(account._id, {
						$set: {
							'latestMinedBlock': res.slice(-1)[0].blockNumber
						}
					})

					MINING_PROCESS_LOCK = false
					console.log("synchronizeData: Remote fetch completed.")

				}).catch((e) => {
					MINING_PROCESS_LOCK = false
					console.log("synchronizeData: Remote fetch completed with errors.")
					console.log(e);
				});
		}
	});
}
