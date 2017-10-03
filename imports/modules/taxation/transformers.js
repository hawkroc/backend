/**
 * Transforms transaction data by applying taxation information.
 * 
 * TODO: this would be a great use of RxJS.
 * 
 */

// TODO: should probably be in definitions.
const FIELD_PREFIX = 'taxation'

const transformTransactions = (transactions, taxationModule) => {
	let transformed = transactions.map(tx => {

		// Find the processed entry and add it to the transaction fields.
		let processedEntry = taxationModule.processed.find(
			p => p.transactionId === tx._id
		)

		tx[`${FIELD_PREFIX}_codeId`] = !!processedEntry
			? processedEntry.codeId
			: undefined

		tx[`${FIELD_PREFIX}_grossTax`] = !!processedEntry
			? processedEntry.grossTax
			: undefined

		tx[`${FIELD_PREFIX}_netValue`] = !!processedEntry
			? processedEntry.netValue
			: undefined

		return tx
	});

	return transformed
}

export default { transformTransactions }