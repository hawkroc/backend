import React from 'react';
import { connect } from 'react-redux';

import TimespanSelectorComponent from '../components/timespanSelector'

const View = () => {
    return (
        <div>
            <TimespanSelectorComponent />
        </div>
    )
}

export default connect()(View)