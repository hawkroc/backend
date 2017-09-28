import { Meteor } from 'meteor/meteor'
import { Accounts as UserAccounts } from 'meteor/accounts-base'

import React from 'react'
import { connect } from 'react-redux'
import { Input, Icon, Button, Modal, message } from 'antd'

import { sanitizeKeyString } from '../../common/inputTransformationHelpers'

// https://github.com/meteor/meteor/issues/8645
window.Buffer = window.Buffer || require("buffer").Buffer;
const Signing = require('ethereumjs-util')

const loginFormStyles = {
    padding: "10px"
}

class LoginComponent extends React.Component {
    state = {
        privateKeyInputValue: ""
    }

    handleChange = (e) => {
        const newValue = e.target.value
        this.setState({ privateKeyInputValue: newValue })
    }

    render () {
        return (
            <Modal
                width="300px"
                closable={false}
                visible={true}
                footer={false}
            >
            <div style={loginFormStyles}>
                <img style={{marginLeft: "18px"}} role="presentation" src="/img/blockeeper_Blue.png" className="logo"/>
                <br/>
                <br/>
                <Input
                    type="password"
                    prefix={
                        <Icon type="lock" style={{ fontSize: 13 }} />
                    } 
                    placeholder="Enter your private key..."
                    value={this.state.privateKeyInputValue}
                    onChange={this.handleChange}
                    onPressEnter={e => this.props.onAttemptLogin(this.state.privateKeyInputValue)}
                />
                <br/>
                <br/>
                <Button 
                        type="primary" 
                        onClick={e => this.props.onAttemptLogin(this.state.privateKeyInputValue)} 
                        style={{ width: "100%" }}>
                    Log in
                </Button>
            </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
	return { }
}

const mapDispatchToProps = dispatch => {
	return {
		onAttemptLogin: (privateKey) => {
			let validPrivateKey = sanitizeKeyString(privateKey)
			if (!validPrivateKey) {
				message.error("Invalid key format")
				return
			}

            let messageBuffer = new Buffer(Meteor.settings.public.login_key, 'hex')
            let keyBuffer = new Buffer(validPrivateKey, 'hex')

			let { v, r, s } = Signing.ecsign(messageBuffer, keyBuffer)

			// Inline source documentation only.
			// https://github.com/meteor/meteor/blob/d854a4b9ba97a230d9d57b4a23f358edd2a36702/packages/accounts-base/accounts_client.js#L206
            UserAccounts.callLoginMethod({
                methodArguments: [
                    {
                        v,
                        r: r.toString('hex'),
                        s: s.toString('hex')
                    }
                ]
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent)