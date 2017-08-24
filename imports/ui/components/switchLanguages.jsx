import React from 'react'
import { Select } from 'antd';

const Option = Select.Option;

/**
 * Presents a language
 *
 */
const View = ({
    // When language has changed.
    onLanguageSelected
}) => {
    return (
        <Select defaultValue='en' onChange={onLanguageSelected}>
            <Option value='en'>English</Option>
            <Option value='cn'>Chinese</Option>
            <Option value='de'>German</Option> 
        </Select>
    )
}

export default View;