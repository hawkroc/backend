import React from 'react'
import { connect } from 'react-redux'
import { LocaleProvider } from 'antd'

import HeaderContentLayout from '../layouts/headerContent'
import BodyContentLayout from '../layouts/bodyContent'
import LoginContainer from './login'

const View = ({
	isProfileLoaded,
	language,
	languageConfig
}) => {
	return (
		<LocaleProvider locale={language}>
			{
				isProfileLoaded 
					// Display the body conetent once profile is known.
					? (
						<div className="list">
							<HeaderContentLayout />
							<BodyContentLayout {...{ languageConfig, language }}/>  
						</div>
					)
					// Otherwise, prompt user to log in to load appropriate profile.
					: <LoginContainer />
			}
		</LocaleProvider>
	)
}

const mapStateToProps = (state) => {
	let activeProfile = state.profiles.active

	// Initial state is ready when the active profile is available.
	let isProfileLoaded = !!activeProfile
		&& Object.keys(activeProfile).length !== 0
		&& activeProfile.constructor !== Object

	return {
		isProfileLoaded,
		language: state.navigation.language,
		languageConfig: state.navigation.languageConfig
	}
}

export default connect(mapStateToProps)(View)
