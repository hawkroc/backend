import React from 'react';
import { connect } from 'react-redux';

const view = () => {
    return <div>My transactions filterer</div>   
}

export default connect()(view)