import { Meteor } from 'meteor/meteor'
import React from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'antd'

import UsersEditorComponent from '../components/usersEditor'
import userMethodTypes from '../../api/profiles/methods/userMethodTypes'


/**
 * Container for working with user data.
 * 
 */
const view = ({ 
	languageConfig, 
	onInsertUser ,
	users
}) => {
	return (
		<Row>
		<Col offset={1} span={10}>
			<UsersEditorComponent
				{...{
					languageConfig,
					onInsertUser,
					users
				}}
			/>
		</Col>
		</Row>
	)
}

const mapStateToProps = state => {
	return { 
		users: state.users.items
	}
}

const mapDispatchToProps = (dispatch, state) => {
	return {
		onInsertUser: newUser => {
			Meteor.call(userMethodTypes.PROFILE_INSERT_USER, {
				...newUser
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(view)
