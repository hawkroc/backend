import React, { Component } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Icon, Tooltip } from 'antd'
export default class ClickCopyCell extends Component {
		state = {
			text: this.props.text
		};

		render() {
			return (
				<CopyToClipboard text={this.state.text}>
					<Tooltip title="Address copied to clipboard!" trigger="click">
						<Icon
							style={{ fontSize: 16 }}
							title="Copy address to clipboard"
							type="copy"
							className="editable-cell-icon"
						/>
					</Tooltip>
				</CopyToClipboard>
			)
		}
}
