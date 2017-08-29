import { Factory } from 'meteor/dburles:factory'

export const initializeFactory = (accountsCollection) => {
	Factory.define('account', accountsCollection, {
		address: () => '0xaaaaaaaaaabbbbbbbbbbccccccccccdddddddddd',
		transactions: () => [],
		latestMinedBlock: () => 0,
		balance: () => 0,
	})
}