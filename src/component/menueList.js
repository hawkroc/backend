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
  this.props.setPromise(GroupBy(),true);
 
}

render() {

const menu = (
  <Menu onClick={this.handleMenuClick}>
    <Menu.Item>
      <a rel="noopener noreferrer" key="month" >Monthly</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" key="quarterly">Quarterly</a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" key="year">Yearly</a>
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