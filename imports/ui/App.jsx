import {BackTop} from 'antd';
import React, {Component} from 'react';
import InputSearch from '../../imports/component/inputSearch';

import PageTabs from '../../imports/component/pageTabs';

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

