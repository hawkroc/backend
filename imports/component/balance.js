import React, {Component} from 'react';
import {GetBalance} from './fetchjson';
import {ChangeRate} from '../utility/utility';

class Balance extends Component {
    state = {

        balance: '',
        address: ''
    }

    getBalance = (address) => {
      
        GetBalance(address).then((response) => {
            this.setState({balance:response});
        })

    };
  componentDidMount =()=>{
     
      this.getBalance(this.props.address);
  }

    componentWillReceiveProps = (nextProps) => {
        console.log('this.props.address ' + nextProps.address);
        this.setState({address: nextProps.address});
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
