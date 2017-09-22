import React from 'react'
import { Select } from 'antd'

const Option = Select.Option

/**
 * Presents a language
 *
 */
const View = ({
	// When language has changed.
	onLanguageSelected
}) => {
	return (
		<Select style={{ width: "100px", margin: "3px" }} defaultValue="en" onChange={onLanguageSelected}>
			<Option value="en">English</Option>
			<Option value="cn">Chinese</Option>
			<Option value="de">German</Option>
			<Option value="jp">Japanese</Option>
		</Select>
	)
}

export default View
