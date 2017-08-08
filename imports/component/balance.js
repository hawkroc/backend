import React, { Component } from 'react';
import {GetBalance}  from './fetchjson';

class Balance extends Component {
  state = {
   
     balance:'',
     address:''
  }


    getBalance =()=>{
    	console.log('this.props.address '+this.state.address)
     GetBalance(this.state.address).then((response)=>{
     this.setState({balance:response});
     })
     
    };



    componentWillReceiveProps = (nextProps) => {
console.log('this.props.address '+nextProps.balanceaddress);
     this.setState({address:nextProps.address});
    };

    render() {
        return (
            <div>
            {this.state.balance}$
            </div>
        );
    }
}

export default Balance;
