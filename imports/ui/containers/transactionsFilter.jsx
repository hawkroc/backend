import React from 'react';
import { connect } from 'react-redux';
// import {ChangeTimeToLocal} from '../../utility/utility'
import TimespanSelectorComponent from '../components/timespanSelector'
import { setSearchTime } from '../../redux/actions/navigationActions'
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
        onTimespanSelected: (dates) => {
            // alert("Handle timestamp selected change"+JSON.stringify(dates[0]))
            dispatch(setSearchTime({'from':dates[0],'to':dates[1]}));
        
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps,null,{pure:false})(View)