import React from 'react';
import { connect } from 'react-redux';

import TimespanSelectorComponent from '../components/timespanSelector'

const View = ({
    onTimespanSelected
}) => {
    return (
        <div>
            <TimespanSelectorComponent {...{onTimespanSelected}} />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTimespanSelected: () => {
            alert("Handle timestamp selected change")
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(View)