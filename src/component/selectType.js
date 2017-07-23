import { Select,notification } from 'antd';
import React from 'react';
import {SaveConfig,GetSetting} from './fetchjson';
const Option = Select.Option;

class SelctType extends React.Component {
  state = {
    options: [],
     labels:[],
  }
 //  componentDidMount = (value) => {
 //    let options;
 //    GetSetting().then((response)=>{
      
 //      let tmp=response.data;
 //     // console.log('this is task'+response.data.labels);
 //     //     this.setState({labels:tmp.labels});
 //           options = tmp.labels.map((v) => {
 //      //  const email = `${value}@${domain}`;
 //        return <Option key={v.name}>{v.name}</Option>;
 //      });
 // this.setState({ options });
 //    })
 
 setOptions=(options)=>{
 
  this.setState({options:options});

 }

 componentWillReceiveProps = (nextProps) => {
  this.setOptions(nextProps.optionsInt)
 }
    


   
  

  
openNotificationWithIcon = (type) => {
    console.log(type);
    notification[type]({
      message: 'Notification',
      description: 'This record type be changed',
      duration: 2,
    });
  };
  

  render() {
    // filterOption needs to be false，as the value is dynamically generated
    return (
      <Select
        mode="combobox"
        style={{ width: 200 }}
        onChange={() => this.openNotificationWithIcon('success')}
        filterOption={false}
        placeholder="select type"
      >
        {this.state.options}
      </Select>
    );
  }
}

export default SelctType;