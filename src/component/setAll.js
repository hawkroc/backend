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

   this.setState({alias:arry});


  }


    setLabels=(arry)=>{
   this.setState({labels:arry});

  }

     saveConfig=()=>{
      let ctmp={alias:this.state.alias,labels:this.state.labels};
 SaveConfig(ctmp)
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
 
     if(tmp){
      
          this.setLabels(tmp.labels);
      
          this.setAlias(tmp.alias);
       
          }
    })
}


 

    render() {

        return (
            <div>
            <Row>
             <Col offset={1} span={9}>
            <Setting setAlias={this.setAlias} initSource={this.state.alias} />

    </Col>

       
             <Col offset={1} span={9}>
             <SetLabels setLabels={this.setLabels} initLabels={this.state.labels} />

    </Col>
</Row>
  <Button className="save-btn" onClick={this.saveConfig}>Save</Button>
            </div>
        );
    }
}

export default SetAll;
