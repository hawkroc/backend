import React, { Component, PropTypes } from 'react';
import {Popover} from 'antd';

class Alias extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
     state = {
   name:''
  };

setAliasSource=(alias)=>{
	
	if(alias!=null){

 let temp= alias.filter(i => {if (i.address===this.props.datasource) return i.name });
if(typeof(temp[0])!='undefined'){

 //console.log("this is temp "+temp[0].name);
 this.setState({name: temp[0].name});
 //return temp[0].name;
}else{
	 this.setState({name: this.props.datasource});
//return this.props.datasource;
}


//this.setState({aliasSource:alias});
}
}
 
 componentWillReceiveProps = (nextProps) => {

 this.setAliasSource(nextProps.aliasSource);

 }


    render() {
        return (
             <Popover content={this.props.datasource} title="Address" trigger="hover">

          {this.state.name}
          </Popover>
        );
    }
}

export default Alias;
