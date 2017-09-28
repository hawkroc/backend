/**
 * Transforms transaction data by applying labelling information.
 * 
 */

const FIELD_PREFIX = 'labelling'

export const transformTransactions = (transactions, labellingModule) => {
	let transformed = transactions.map(tx => {

		let label = labellingModule.labelled.find(
			l => l.transactionId === tx._id
		)

		tx[`${FIELD_PREFIX}_labelTypeId`] = !!label
			? label.labelTypeId
			: undefined
			
		return tx
	});

	return transformed
}
