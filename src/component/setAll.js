import React, { Component, PropTypes } from 'react';
import Setting from './setting';
import SetLabels from './setLabels';
import { Row, Col,Button } from 'antd';
class SetAll extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

      state = {
   
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
  <Button className="save-btn">Save</Button>
            </div>
        );
    }
}

export default SetAll;
