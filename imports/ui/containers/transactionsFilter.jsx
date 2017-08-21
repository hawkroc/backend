import React from 'react';
import { connect } from 'react-redux';
import {ChangeTimeToBlockNumber} from '../../utility/utility'
import TimespanSelectorComponent from '../components/timespanSelector'
import { setSearchBlock } from '../../redux/actions/navigationActions'
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
            alert("Handle timestamp selected change"+JSON.stringify(ChangeTimeToBlockNumber(dates[0])))
            dispatch(setSearchBlock({'from':ChangeTimeToBlockNumber(dates[0]),'to':ChangeTimeToBlockNumber(dates[1])}));
        
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps,null,{pure:false})(View)