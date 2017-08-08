import { Row, Col, Button } from 'antd'
import React from 'react'
import TimeRelatedForm from './searchTime'
import { GetdataFromApi, GetCurrentBlock } from './fetchjson'

const config = require('../config/config')

class InputSearchComponent extends React.Component {
 constructor(props) {
    super(props)
    this.state = {
     // userName: '',
        start: '',
        end: '',
        address:config.address,
    }
  }

setTime=(start,end)=>{
  console.log("time diff"+start+"diff"+end)

  // TODO: action creator callback.
  // this.setState({
  //    start:start,
  //    end:end,
  //   })
}

componentDidMount =()=>{

//this.props.changeItem(GetCurrentBlock(this.state.address));
}


  onclickButton = () => {
    //this.props.changeItem(GetdataFromApi(this.state.start,this.state.end,this.state.address,false));
 
  };


  render() {
    return (
      <div>
      <div className="inputSearch ">

        <Row>
          <Col offset={1}  span={2}>
            <div >
              <img  role="presentation" className="logo" />
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


	export default InputSearchComponent;