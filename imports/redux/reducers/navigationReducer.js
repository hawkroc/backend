import * as actionTypes from '../constants/actionTypes'

import enUS from 'antd/lib/locale-provider/en_US'
import en from '../../../public/language/en'

const initialState = {
	/**
     * Is there currently a filter active over the transactions.
     */
	filterActive: false,
	language: enUS,
	languageConfig: en,

	/**
     * If filtering - the current timespan filter range.
     */
	filterTimespan: {
		from: 0,
		to: 0
	}
}

const reducer = (state = initialState, payload) => {
	switch (payload.type) {
		case actionTypes.NAVIGATION_LOCALE_CHANGED:
			return Object.assign({ }, state, { language: payload.value.language, languageConfig: payload.value.languageConfig })

		case actionTypes.NAVIGATION_TXFILTER_CHANGED:
			return Object.assign({ }, state, { filterTimespan: payload.value })

		default:
			return state
	}
}

export default reducer
