/**
 * Validation helpers for UI inputs.
 * 
 */

/**
 * Validator for 256 bit keys represented in hexidecimal characters with 
 * optional 0x prefix.
 * 
 */
export const KEY_VALIDATOR_HEX = /^(0x)?[0-9a-f]{64}$/i
export const KEY_VALIDATOR_HEX_NOPREFIX = /^[0-9a-f]{64}$/i

/**
 * Validator for 160 bit addresses represented in hexidecimal characters with 
 * optional 0x prefix.
 * 
 */
export const ADDRESS_VALIDATOR_HEX = /^(0x)?[0-9a-f]{40}$/i
export const ADDRESS_VALIDATOR_HEX_NOPREFIX = /^[0-9a-f]{40}$/i
/**
 *  validator 0<x<1
 * 
 */
export const TAX_RATE_VALIDATOR=/^(0.)[0-9]{1,3}$/i 