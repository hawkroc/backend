import {Tabs} from 'antd';
import React from 'react';
import TransactionList from './transactionList';
import LineChart from './chartLine';
import SetAll from './setAll';
import {GetSetting} from './fetchjson';
const TabPane = Tabs.TabPane;


class PageTabs extends React.Component {
  state = {
    promise: {},
    config:{},
    data: [],
  };

  constructor(props, context) {
    super(props, context);

 GetSetting().then((response)=>{


     if(response[0]){
 
   this.setState({config:response[0]});
      
        
     }
         
         
    })

  };

changeConfig=(config)=>{
this.setState({config:config});
}


  componentWillReceiveProps = (nextProps) => {
    this.setPromise(nextProps.promise);

  };

  setPromise = (promise) => {
    this.setState({promise: promise});

  };
setLabels=(labels)=>{

  this.setState({labels:labels});
};
  setAlias=(arry)=>{
 
   this.setState({alias:arry});

  }


  render() {

    return (
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Busines Account" key="1">
          <TransactionList promise={this.state.promise} config={this.state.config}/>
        </TabPane>
        <TabPane tab="Dashboard" key="2">
          <LineChart />
        </TabPane>
        <TabPane tab="Setting" key="3">
          <SetAll changeConfig={this.changeConfig} config={this.state.config}/>
        </TabPane>
      </Tabs>
    );
  }

}


export default PageTabs;

// ReactDOM.render(
//   <Tabs defaultActiveKey="1" onChange={callback}>
//     <TabPane tab="Tab 1" key="1">Content of Tab Pane 1</TabPane>
//     <TabPane tab="Tab 2" key="2">Content of Tab Pane 2</TabPane>
//     <TabPane tab="Tab 3" key="3">Content of Tab Pane 3</TabPane>
//   </Tabs>
// , mountNode);