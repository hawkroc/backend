import { notification } from 'antd';
import React from 'react';
import {SaveConfig,GetSetting} from './fetchjson';
import { Select } from 'antd';
const { Option, OptGroup } = Select;

class SelctType extends React.Component {
  state = {
    GSToptions: [],
    NoGSToptions: [],
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
        style={{ width: 200 }}
        onChange={() => this.openNotificationWithIcon('success')}
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