import React, { Component, PropTypes } from 'react';
import {GetExtrange} from './fetchjson';

class Exchange extends Component {
    constructor(props) {
    super(props);
    this.state = {
    extrange:"",
    };
  }

componentDidMount= ()=> {
   let intervalId = setInterval(this.timer, 6000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});
}

componentWillUnmount= ()=> {
   // use intervalId from the state to clear the interval
   clearInterval(this.state.intervalId);
}

timer= ()=> {
GetExtrange().then((response)=>{

  this.setState({ extrange:response.toString() });

})
 

}



    render() {
        return (
            
        
{this.state.extrange} 



        );
    }
}

export default Exchange;
