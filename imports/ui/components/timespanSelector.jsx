import React from 'react'

import { DatePicker } from 'antd'
const { RangePicker } = DatePicker

/**
 * Presents a timespan selctor for temporal filtering.
 * 
 */
 const View = ({
    // When timespan data has changed.
    onTimespanSelected,

    // Timespan to display in picker.
    timespan
 }) => {
     return (
        <div>
            <RangePicker
                onChange={(dates) => onTimespanSelected(dates)}
                size='large'
                format='YYYY-MM-DD HH:mm:ss'
            />
        </div>
     )
 }

 export default View;