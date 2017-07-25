import {Table, Button} from 'antd';
import React from 'react';
import {CSVLink} from 'react-csv';
import Menuelist from './menueList';
import SelectType from './selectType';
import {GetSetting} from './fetchjson';
import Alias from './alias';

class TransactionList extends React.Component {
  state = {
    show: true,
    data: null,
    loading: true,
    labels:[],
    options: [],
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

  

onChangeSelect=(text)=>{
this.openNotificationWithIcon('success');
  console.log(`selected ${text}`);
 // console.log(''+record);
}

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
    if(promise===null){
        this.setState({isGroupBy:isGroupBy});
        return null;
    }
    promise.then((value) => {
      let rs=null;
      
      if(isGroupBy){

        rs=value.data;

      }else{
        rs=value;
      }
      rs.map((i,index)=>{
        i.key=index+1;
      });
      this.setState({isGroupBy:isGroupBy,data: rs,groupbyData:rs, loading: false, show: !this.state.show});
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

  componentDidMount =()=>{
    GetSetting().then((response)=>{
      
      let tmp=response.data;
    
          this.setState({labels:tmp.labels,alias:tmp.alias});
     this.setState({options: response.data.labels});

         
    })


// this.props.changeItem(GetCurrentBlock(this.state.address));
}





  componentWillReceiveProps = (nextProps) => {
    this.setPromise(nextProps.promise,false);
  
     
  };


  render() {
    let {sortedInfo, filteredInfo} = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    
   let columnsGroup=[
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

    let columns = [
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
            <Alias datasource={record.from} aliasSource={this.state.alias} name=''/>
        ),
      },

      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
        width: "15%",
        render: (text, record) => (


         <Alias datasource={record.to} aliasSource={this.state.alias}/>
         
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
        key: 'type',
        width: "18%",
        render: (text, record) => (
      
       
          <div>
<SelectType optionsInt={this.state.options} recordId={record.timeStamp} />
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
            dataSource={this.state.isGroupBy?this.state.groupbyData:this.state.data }
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



