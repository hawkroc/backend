import React, { Component } from 'react';
import {Menu, Dropdown, message } from 'antd';
import {GroupBy,GetCurrentBlock} from './fetchjson';
//const configaddress="0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
const config = require('../../config');

class MenueList extends Component {



 handleButtonClick=(e)=> {
  message.info('Click on left button.');
  console.log('click left button', e);
}

 handleMenuClick=(e)=> {
  // GroupBy().then((response)=>{
  //   console.log(' '+response.data);
  //   });
  // console.log('this ', e);
  // console.log("key is "+e.key);
  if(e.key==="item_0"){
      console.log('this is groupBy ');
  this.props.setPromise(GroupBy(),true);
}else {
  console.log('this is records ');
  this.props.setPromise(GetCurrentBlock(config.address),false);
}
 
}

render() {

const menu = (
  <Menu onClick={this.handleMenuClick}>
    <Menu.Item>
      <a rel="noopener noreferrer" key="1" >Monthly</a>
    </Menu.Item>
    <Menu.Item>
      <a  rel="noopener noreferrer" key="2">Records</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" key="3">Yearly</a>
    </Menu.Item>
  </Menu>
);

const menuType = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://192.168.88.77:3000/">GST</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://192.168.88.77:3000/">Non-GST</a>
    </Menu.Item>
  </Menu>
);

    return (
      <div className="menueList">
  
            <Dropdown.Button  overlay={menuType}>
              Type
            </Dropdown.Button>

   <Dropdown.Button  overlay={menu}>
      Summary
    </Dropdown.Button>


       
      </div>
    );
  }


}
export default MenueList;