import { Table,  Button, Popconfirm,Select } from 'antd';
import React, { Component } from 'react';
import EditableCell from './editableCell';
const Option = Select.Option;
class SetLabels extends React.Component {



 handleChange=(value)=> {
  console.log(`selected ${value}`);
 // this.onCellChange(index, 'name');
}

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
      title: 'GST',
      dataIndex: 'GST',
       width: '30%',
      render: (text, record, index) => (
        <div>
    <Select defaultValue="true"  onChange={this.onCellChange(index, 'GST')}>
      <Option value="true">GST</Option>
      <Option value="false">UNGST</Option>
    </Select>
  </div>
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


  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.props.setLabels(dataSource);
      this.setState({ dataSource });
      //
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.props.setLabels(dataSource);
    this.setState({ dataSource });
     //
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `input the Alias${count}`,
      GST: `input your Address. ${count}`,
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
         <h2> Please input the labels  </h2>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}



export default SetLabels;



