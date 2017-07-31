// import { Input, Icon } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import React from 'react';
import TimeRelatedForm from './searchTime';
import {GetdataFromApi,GetCurrentBlock} from './fetchjson';
const config = require('../../config');

//const configaddress="0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";

class InputSearch extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
     // userName: '',
        start: '',
        end: '',
        address:config.hardcode_address,
    };
  }

setTime=(start,end)=>{
  console.log("time diff"+start+"diff"+end);
  this.setState({
     start:start,
     end:end,
    });
}

componentDidMount =()=>{

this.props.changeItem(GetCurrentBlock(this.state.address));
}


  emitEmpty = () => {
    // this.userNameInput.focus();
    this.setState({ userName: '' });
  }

 onChangeStart = (e) => {
    this.setState({ start: e.target.value });
  }
   onChangeEnd = (e) => {
    this.setState({ end: e.target.value });
  }



  onclickButton = () => {
    this.props.changeItem(GetdataFromApi(this.state.start,this.state.end,this.state.address,false));
 
  };


  render() {
 //   const { userName } = this.state;
   // const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    return (
      <div>
      <div className="inputSearch ">

    <Row>
 <Col offset={1}  span={2}>
 <div >
 <img  role="presentation" className="logo" src={require("../../img/blockeeper_Blue.png")}/>
 </div>



    </Col>
      <Col offset={6} span={6}>
       <TimeRelatedForm setTime={this.setTime}/>
   
      </Col>
 <Col offset={1} span={3}>
       <Button onClick={this.onclickButton} type="primary" shape="circle" icon="search" />
       </Col>


       </Row>
      
      </div>
   
          </div>
         
    );
  }
	}


	export default InputSearch;