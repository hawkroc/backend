import React, { Component } from 'react';
import {GetExtrange} from './fetchjson';

class Exchange extends Component {
    constructor(props) {
    super(props);
    this.state = {
    ETH:"",
    BTC:"",
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
GetExtrange("ETH").then((response)=>{
console.log(JSON.stringify(response));
  this.setState({ ETH:response.toString() });

});
 GetExtrange("BTC").then((response)=>{

  this.setState({ BTC:response.toString() });

});

}



    render() {
        return (
            
        
{this.state.ETH} 
{this.state.BIT} 


        );
    }
}

export default Exchange;
