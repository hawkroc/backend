import { Meteor } from 'meteor/meteor'

import axios from 'axios'

/**
 * get Exchange from cryptocompare the default type is USD
 */
const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms='
export const GetExchange = (type = 'USD') => {
	let final = url + type
	return axios
		.get(final)
		.then((response) => {
			return  response
		})
		.catch(error => {
			throw(error)
		})
}


const balanceUrl = 'https://api.etherscan.io/api?module=account&action=balance&tag=latest' + 
	`&apikey=${Meteor.settings.third_party.ether_scan.api_key}`

export const GetBalance = (address) => {
	let final = balanceUrl + `&address=${address}`

	return axios.get(final).then(
		(response) => {
			return response
		}).catch(error => {
		throw(error)
	})
}

