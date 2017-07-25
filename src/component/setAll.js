import React, { Component, PropTypes } from 'react';
import Setting from './setting';
import SetLabels from './setLabels';
import {SaveConfig,GetSetting} from './fetchjson';
import { Row, Col,Button } from 'antd';
class SetAll extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

      state = {
   config:{alias:[],labels:[]},
    alias:[],
    labels:[],
   
  };

    setAlias=(arry)=>{
       console.log(this.state.alias.toString());
   this.setState({alias:arry});

  }


    setLabels=(arry)=>{
       console.log(this.state.labels.toString());
   this.setState({labels:arry});

  }

     saveConfig=()=>{
      let ctmp={alias:this.state.alias,labels:this.state.labels};
 // this.state.config.alias=this.state.alias;
 //  this.state.config.labels=this.state.labels;
 this.setState({config:ctmp});
 SaveConfig(this.state.config)
 .then((response)=>{
    // console.log('this is what fuck');
    })
    .catch((error)=>{
      console.log(error);
    });
   

  }


  componentDidMount =()=>{
    GetSetting().then((response)=>{
      
      let tmp=response.data;
     // console.log('this is task'+response.data.labels);
          this.setState({labels:tmp.labels,alias:tmp.alias});
          this.props.setLabels(tmp.labels);
          this.props.setAlias(tmp.alias);
    })


// this.props.changeItem(GetCurrentBlock(this.state.address));
}


 

    render() {
        return (
            <div>
            <Row>
             <Col offset={1} span={9}>
            <Setting setAlias={this.setAlias} initSource={this.state.alias} />

    </Col>

       
             <Col offset={1} span={9}>
            <SetLabels setLabels={this.setLabels} initSource={this.state.labels} />

    </Col>
</Row>
  <Button className="save-btn" onClick={this.saveConfig}>Save</Button>
            </div>
        );
    }
}

export default SetAll;
