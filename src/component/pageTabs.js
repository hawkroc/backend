import {Tabs} from 'antd';
import React from 'react';
import TransactionList from './transactionList';
import LineChart from './chartLine';
import SetAll from './setAll';
const TabPane = Tabs.TabPane;


class PageTabs extends React.Component {
  state = {
    promise: {},
  //  config:{},
    alias:[],
    labels:[],
    data: [],
  };
  callback = (key) => {

  }

  constructor(props, context) {
    super(props, context);
  };


  componentWillReceiveProps = (nextProps) => {
    this.setPromise(nextProps.promise);
    // this.setLabels(nextProps.labels);
    // this.setAlias(next)
  };

  setPromise = (promise) => {
    this.setState({promise: promise});

  };
setLabels=(labels)=>{
  console.log('this is test set lablels'+labels);
  this.setState({labels:labels});
};
  setAlias=(arry)=>{
       console.log(this.state.alias.toString());
   this.setState({alias:arry});

  }


  render() {
    return (
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="Busines Account" key="1">
          <TransactionList promise={this.state.promise} labels={this.state.labels}/>
        </TabPane>
        <TabPane tab="Dashboard" key="2">
          <LineChart />
        </TabPane>
        <TabPane tab="Setting" key="3">
          <SetAll setAlias={this.setAlias} setLabels={this.setLabels} setAlias={this.setAlias}/>
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