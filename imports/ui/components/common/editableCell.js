/**
 * Example adapted from Ant Design website:
 *  https://ant.design/components/table/#components-table-demo-edit-cell
 * 
 */

import React from 'react'
import { Input, Icon } from 'antd'

class EditableCell extends React.Component {
	// Manage own internal state.
		state = {
			value: this.props.value,

			// Function to transform the value for masking.
			valueMask: this.props.valueMask ? this.props.valueMask : v => v,
			editable: false,
		}

		handleChange = (e) => {
			const value = e.target.value
			this.setState({ value })
		}

		check = () => {
		
			if (this.props.onChangeConfirmed) {
			let rs=	this.props.onChangeConfirmed(this.state.value.trim())
				if(!rs){
					this.setState({ editable: false })
				}
			}
		}

		edit = () => {
			this.setState({ editable: true })
		}

		render() {
			const { value, valueMask, editable } = this.state
			return (
				<div className="editable-cell">
					{
						editable ?
							<div className="editable-cell-input-wrapper">
								<Input
									value={value}
									onChange={this.handleChange}
									onPressEnter={() => this.check()}
								/>
								<Icon
									type="check"
									className="editable-cell-icon-check"
									onClick={() => this.check()}
								/>
							</div>
							:
							<div className="editable-cell-text-wrapper">
								{valueMask(value) || ' '}
								<Icon
									type="edit"
									className="editable-cell-icon"
									onClick={this.edit}
								/>
							</div>
					}
				</div>
			)
		}
}

export default EditableCell
