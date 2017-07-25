import { notification } from 'antd';
import React from 'react';
import { Select } from 'antd';
import {UpdateType} from './fetchjson';
const { Option, OptGroup } = Select;

class SelctType extends React.Component {
  state = {
    GSToptions: [],
    NoGSToptions: [],
     labels:[],
  }

 setOptions=(options)=>{
 
  //this.setState({options:options});




let GST= options.filter(i => {if (i.GST) return i }).map( (i) =>{

      return <Option key={i.name}>{i.name}</Option> 

    });


let NoGST= options.filter(i => {if (!i.GST) return i }).map( (i) =>{

      return <Option key={i.name}>{i.name}</Option> 

    });

this.setState({GSToptions:GST});
this.setState({NoGSToptions:NoGST});

 }

 componentWillReceiveProps = (nextProps) => {
  this.setOptions(nextProps.optionsInt);
 }
    


    handleChange=(value)=> {
      this.openNotificationWithIcon("success");
       UpdateType(this.props.recordId,value);
  console.log(`selected ${value}`);
}

  

  
openNotificationWithIcon = (type) => {   
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
        style={{ width: 200 }}
        onChange={this.handleChange}
        placeholder="select type"
      >
       <OptGroup label="GST">
       {this.state.GSToptions}
          </OptGroup>

          <OptGroup label="NoGst">
           {this.state.NoGSToptions}
    
          </OptGroup>

      </Select>
    );
  }
}

export default SelctType;