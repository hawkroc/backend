import React, { Component, PropTypes } from 'react';
import Setting from './setting';
import SetLabels from './setLabels';
import {SaveConfig} from './fetchjson';
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
 //      console.log("this start");
 //       console.log(this.state.labels.toString());
 // console.log(this.state.alias.toString());
 this.state.config.alias=this.state.alias;
  this.state.config.labels=this.state.labels;
 SaveConfig(this.state.config)
 .then((response)=>{
     console.log('this is what fuck');
    })
    .catch((error)=>{
      console.log(error);
    });
   

  }



    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <Row>
             <Col offset={1} span={9}>
            <Setting setAlias={this.setAlias} />

    </Col>

       
             <Col offset={1} span={9}>
            <SetLabels setLabels={this.setLabels} />

    </Col>
</Row>
  <Button className="save-btn" onClick={this.saveConfig}>Save</Button>
            </div>
        );
    }
}

export default SetAll;
