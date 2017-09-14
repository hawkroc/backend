import React from 'react'
import { connect } from 'react-redux'
import { LocaleProvider } from 'antd'
import HeaderContentLayout from '../layouts/headerContent'
import BodyContentLayout from '../layouts/bodyContent'

const View = ({
	stateIsReady,
	language,
	languageConfig
}) => {
	return (
		<LocaleProvider locale={language}>
			<div className="list">
				<HeaderContentLayout />
				{stateIsReady ? <BodyContentLayout {...{ languageConfig, language }}/>  : null}
			</div>
		</LocaleProvider>
	)
}

const mapStateToProps = (state) => {
	let activeProfile = state.profiles.active

	// Initial state is ready when the active profile is available.
	let stateIsReady = !!activeProfile
								&& Object.keys(activeProfile).length !== 0
								&& activeProfile.constructor !== Object

	return {
		stateIsReady,
		language: state.navigation.language,
		languageConfig: state.navigation.languageConfig
	}
}

export default connect(mapStateToProps)(View)
