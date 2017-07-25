import {BackTop} from 'antd';
import React, {Component} from 'react';
import InputSearch from './inputSearch';
// import TransactionList from './transactionList';
import PageTabs from './pageTabs';
import Exchange from './exchange';
export default class App extends Component {

    state={
        searchText: '',
        promise: {},
    };

  

    changeItem=(item) => {
        this.setState({
            promise: item
        });
    };

    render() {
        return (

          <div>
            <div className="carousel"><Exchange/></div>
            <div>  <InputSearch changeItem={ this.changeItem }/></div> 
            <div>  <PageTabs promise={this.state.promise}/></div>
            <BackTop>
            <div className="ant-back-top-inner"> UP </div>
            </BackTop>
      
          </div>

    )
        ;
    }
}

