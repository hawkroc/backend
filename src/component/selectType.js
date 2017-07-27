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

if(options){

let GST= options.filter(i => {if (i.GST) return i }).map( (i) =>{

      return <Option key={i.key} value={i.key.toString()}>{i.name}</Option>

    });


let NoGST= options.filter(i => {if (!i.GST) return i }).map( (i) =>{

      return <Option key={i.key} value={i.key.toString()}>{i.name}</Option> 

    });

this.setState({GSToptions:GST});
this.setState({NoGSToptions:NoGST});
}
 }

 componentWillReceiveProps = (nextProps) => {
  this.setOptions(nextProps.optionsInt);

  this.setState({recordId:nextProps.record._id});
  if(nextProps.optionsInt){
for (let t of nextProps.optionsInt ){
  if(nextProps.record.type===t.key){
   // console.log(nextProps.record.type);
   // this.setState({selectValue:nextProps.record.type});
    this.setState({selectValue:t.name});
    break;

  }
}
} 
 }
    


    handleChange=(value)=> {
      this.openNotificationWithIcon("success");
       UpdateType(this.state.recordId,value);
}

  

  
openNotificationWithIcon = (type) => {   
    notification[type]({
      message: 'Notification',
      description: 'This record type be changed',
      duration: 2,
    });
  };
  

  render() {
   if(this.state.selectValue){
   console.log(this.state.selectValue);
}

    return (
      <div>
      <div>{this.state.selectValue}</div>
      <Select
        defaultValue={this.state.selectValue}
        style={{ width: 100 }}
        onChange={this.handleChange}
        placeholder="select type"
      >
       <OptGroup label="GST" >
       {this.state.GSToptions}
          </OptGroup>

          <OptGroup label="NoGst">
           {this.state.NoGSToptions}
    
          </OptGroup>

      </Select>
      </div>
    );
  }
}

export default SelctType;