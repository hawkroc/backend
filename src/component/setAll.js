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


constructor(props, context) {
    super(props, context);
  }


    setLabels=(arry)=>{
   this.setState({labels:arry});

  }

     saveConfig=()=>{
      let ctmp={alias:this.state.alias,labels:this.state.labels};
    this.props.changeConfig(ctmp);
 SaveConfig(ctmp)
 .then((response)=>{
    // console.log('this is what fuck');
    })
    .catch((error)=>{
      console.log(error);
    });
   

  }


componentWillReceiveProps = (nextProps) => {
 
         
  };


  componentDidMount =()=>{
   //console.log('this test ok1.........'+JSON.stringify(this.props.config));
let tmp=this.props.config;
 if(tmp){
   
           this.setLabels(tmp.labels);
          this.setAlias(tmp.alias);
     }

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
