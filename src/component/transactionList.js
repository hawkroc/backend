import {Table, Button, notification} from 'antd';
import {Menu, Dropdown} from 'antd';
import React from 'react';
import {CSVLink} from 'react-csv';
import {Select, Popover} from 'antd';
import Menuelist from './menueList';

const {Option, OptGroup} = Select;
class TransactionList extends React.Component {
  state = {
    show: true,
    data: null,
    loading: true,
    error: null,
    filteredInfo: null,
    sortedInfo: null,
    isGroupBy:false,
    groupbyData:null,
    csvData: [],
  };
  handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  handleGroupby=()=>{
  console.log("this clickbutton");
};


  handleChangeSelect = (value) => {
    console.log(`selected ${value}`);

  };

  openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Notification',
      description: 'This record type be changed',
      duration: 2,
    });
  };



  parseDataFromApi = () => {
    let temp = this.state.data.map((item) => {
      return {
        Time: new Date(parseInt(item.timeStamp) * 1000).toLocaleDateString(),
        From: item.from,
        To: item.to,
        Tx: (item.gas * Math.pow(10, -18) * item.gasPrice).toFixed(8),
        Success: item.isError,
        Note: null,
        Txtype: null,

      };
    });
    this.setState({csvData: temp});
  }

  setPromise = (promise,isGroupBy) => {
    promise.then((value) => {
      let rs=null;
      
      if(isGroupBy){

        rs=value.data;

      }else{
        rs=value;
      }
      this.setState({isGroupBy:isGroupBy,data: rs, loading: false, show: !this.state.show});
      if(!isGroupBy){
              this.parseDataFromApi();
      }


    }).catch((error) => {
      console.error(error);
    });

  };
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };


  componentWillReceiveProps = (nextProps) => {
    this.setPromise(nextProps.promise,false);
  };
  setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  }

  render() {
    let {sortedInfo, filteredInfo} = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    
   const columnsGroup=[
 {
        title: 'Time',
        dataIndex: '_id',
        key: '_id',
        width: "10%",
          render: (text) => {
          return (text.year+"/"+text.month);
        },
      },





 {
        title: 'TotalPrice',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        width: "10%",
        render: (text) => {
          return (text * Math.pow(10, -18)).toFixed(8);
        },
      },



];

    const columns = [
      {
        title: 'Time',
        dataIndex: 'timeStamp',
        key: 'timeStamp',
        width: "10%",
        render: (text) => {
          return new Date(parseInt(text) * 1000).toLocaleDateString();
        },
        sorter: (a, b) => a.timeStamp - b.timeStamp,
        sortOrder: sortedInfo.columnKey === 'timeStamp' && sortedInfo.order,
      },
      {
        title: 'From',
        dataIndex: 'from',
        key: 'from',
        width: "15%",
        render: (text, record) => (
          <Popover content={record.from} title="from" trigger="hover">
            <Button>Centrality Business Account</Button>
          </Popover>
        ),
      },

      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
        width: "15%",
        render: (text, record) => (
          <Popover content={record.to} title="to" trigger="hover">
            <Button>Blockhaus Swiss Account</Button>
          </Popover>
        ),


      },


      {
        title: 'Spent',
        dataIndex: 'gas',
        key: 'gas',
        width: "6%",
        render: (text, record) => {
          return (text * Math.pow(10, -18) * record.gasPrice).toFixed(8);
        },
      },

      {
        title: 'Note',
        dataIndex: 'contractAddress',
        key: 'contractAddress',
        width: "6%",
        render: (text) => {
          return text === "" ? '' : 'with internal tx';
        },
        filters: [
          {text: 'No', value: 'No'},
          {text: 'Yes', value: 'Yes'},
        ],
        filteredValue: filteredInfo.contractAddress || null,
        onFilter: (value, record) => record.contractAddress.includes(value),
      },

      {
        title: ' Tx type',
        key: 'blockNumber',
        width: "18%",
        render: (text, record) => (
          <div>

            <Select
              defaultValue="3"
              style={{width: 150}}
              onChange={() => this.openNotificationWithIcon('success')}
            >

              <OptGroup label="GST">
                <Option value="1">Legal Fees</Option>
                <Option value="2">Computer Expenses</Option>
                <Option value="3">General Expenses</Option>
                <Option value="4">Rent</Option>
                <Option value="5"> Staff Expenses</Option>


              </OptGroup>

              <OptGroup label="Non-GST">
                <Option value="6">Payroll</Option>
              </OptGroup>
            </Select>
          </div>
        ),
      },

    ];
    return (
      <div>

        <div className="tableList">
          <div className="table-operations">

          <Menuelist setPromise={ this.setPromise}/>
            <Button icon="download">
              <CSVLink filename={"export.csv"} data={(this.state.csvData) ? (this.state.csvData) : []}>Xero
                feed(csv)</CSVLink>
            </Button>
          </div>
          <Table
            loading={this.state.loading}
            columns={this.state.isGroupBy?columnsGroup:columns }
            dataSource={this.state.data }
            onChange={ this.handleChange }
            pagination={{pageSize: 100}}
            scroll={{y: 500}}
          />
        </div >

      </div>
    );
  }
}
export default TransactionList;



