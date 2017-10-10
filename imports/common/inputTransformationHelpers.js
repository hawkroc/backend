/**
 * Input transformations for working with UI values.
 * 
 */

import { KEY_VALIDATOR_HEX_NOPREFIX, ADDRESS_VALIDATOR_HEX_NOPREFIX,TAX_RATE_VALIDATOR } from './inputValidationHelpers'

/**
 * Return a valid hexidecial key string from the input if possible.
 * Strips 0x prefix if provided. Returns null if not validatable.
 * 
 */
export const sanitizeKeyString = key => {
	if (!key || typeof(key) !== 'string') return null

	let strippedKey = key.trim().toLowerCase()
	if (strippedKey.substring(0, 2) === '0x') {
		strippedKey = strippedKey.substring(2)
	}

	return KEY_VALIDATOR_HEX_NOPREFIX.test(strippedKey)
		? strippedKey : null
}

export const checkTaxRate=(rate)=>{

	return TAX_RATE_VALIDATOR.test(rate)
	? rate : null
}
/**
 * Return a valid hexidecial address string from the input if possible.
 * Strips 0x prefix if provided. Returns null if not validatable.
 * 
 */
export const sanitizeAddressString = address => {
	if (!address || typeof(address) !== 'string') return null

	let strippedAddress = address.trim().toLowerCase()
	if (strippedAddress.substring(0, 2) === '0x') {
		strippedAddress = strippedAddress.substring(2)
	}

	return ADDRESS_VALIDATOR_HEX_NOPREFIX.test(strippedAddress)
		? strippedAddress : null
}
