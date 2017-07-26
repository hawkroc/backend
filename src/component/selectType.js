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
     recordId:'',
     selectValue:'',
  }

 setOptions=(options)=>{
 
  //this.setState({options:options});


if(options){

let GST= options.filter(i => {if (i.GST) return i }).map( (i) =>{

      return <Option key={i._id}>{i.name}</Option> 

    });


let NoGST= options.filter(i => {if (!i.GST) return i }).map( (i) =>{

      return <Option key={i._id}>{i.name}</Option> 

    });

this.setState({GSToptions:GST});
this.setState({NoGSToptions:NoGST});
}
 }

 componentWillReceiveProps = (nextProps) => {
  this.setOptions(nextProps.optionsInt);
  this.setState({recordId:nextProps.recordId});
  //console.log('this is test value ......'+nextProps.selectValue);
  this.setState({selectValue:nextProps.selectValue})
 }
    


    handleChange=(value)=> {
      this.openNotificationWithIcon("success");
       UpdateType(this.state.recordId,value);
  //console.log(`selected ${value}`+' id is '+ this.state.recordId);
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
        defaultValue={this.state.selectValue}
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