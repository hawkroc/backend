import React, { Component } from 'react';
import {Menu, Dropdown,Button, Icon, message } from 'antd';
import {GroupBy} from './fetchjson';



class MenueList extends Component {
 constructor(props) {
    super(props);
 
  }


 handleButtonClick=(e)=> {
  message.info('Click on left button.');
  console.log('click left button', e);
}

 handleMenuClick=(e)=> {
  // GroupBy().then((response)=>{
  //   console.log(' '+response.data);
  //   });
  console.log('this key', e);
  this.props.setPromise(GroupBy(),true);
 
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
      <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/">GST</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://localhost:3000/">Non-GST</a>
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