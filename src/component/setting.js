import { Table, Button, Popconfirm } from 'antd';
import React, { Component } from 'react';
import EditableCell from './editableCell';


class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'name')}
        />
      ),
    }, 
    {
      title: 'address',
      dataIndex: 'address',
       width: '30%',
      render: (text, record, index) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(index, 'address')}
        />
      ),
      
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
          this.state.dataSource.length > 0 ?
          (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
              <a href="#">Delete</a>
            </Popconfirm>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [],
      count: 0,
    };
  }
 componentWillReceiveProps = (nextProps) => {
   // this.setPromise(nextProps.initSource);
    this.setState({dataSource:nextProps.initSource});
  };


  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.props.setAlias(dataSource);
      this.setState({ dataSource });
      //
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.props.setAlias(dataSource);
    this.setState({ dataSource });
     //
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count+1,
      name: `input the Alias${count}`,
      address: `input your Address. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
      <h2> Please input the address you want track </h2>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}



export default Setting;



