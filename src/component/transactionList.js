import {Table, Button} from 'antd';
import React from 'react';
import {CSVLink} from 'react-csv';
import Menuelist from './menueList';
import SelectType from './selectType';
import {GetExchange} from './fetchjson';


class TransactionList extends React.Component {
  state = {
    show: true,
    data: null,
    loading: true,
    options: [],
    alias:[],
    error: null,
    exchange:"",
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
 // console.log("this clickbutton");
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

      let aliasTemp=this.state.alias;
      if(aliasTemp){
      rs.map((i,index)=>{
        i.key=index+1;
       // console.log(i.from);
       for(let t of aliasTemp){
       i.from= (i.from===t.address)?t.name:i.from;
       i.to= (i.to===t.address)?t.name:i.to;
       }
      });
}
         

      this.setState({csvData: rs,isGroupBy:isGroupBy,data: rs,groupbyData:rs, loading: false, show: !this.state.show});
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


componentDidMount= ()=> {
  this.getCurrentExchange();
};

getCurrentExchange=()=>{

   GetExchange({"ETH":"","BTC":""}).then((response)=>{
   //console.log('this exchange'+response.toString() )
  this.setState({ exchange:response.toString() });

})
};


  componentWillReceiveProps = (nextProps) => {

     this.setPromise(nextProps.promise,false); 
    //  console.log("1");
  let tmp=nextProps.config;
     if(tmp){
        this.setState({options: tmp.labels});
           this.setState({alias: tmp.alias});

     }
      
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
        width: "12%",
        render: (text, record) => (
         record.from 
        ),
      },

      {
        title: 'To',
        dataIndex: 'to',
        key: 'to',
        width: "12%",
        render: (text, record) => (

record.to
         
        ),


      },


      {
        title: 'Amount',
        dataIndex: 'gas',
        key: 'gas',
        width: "6%",
        render: (text, record) => {
          return (text * Math.pow(10, -18) * record.gasPrice).toFixed(8);
        },
      },

     {
        title: 'USD',
        dataIndex: 'gasPrice',
        key: 'gasPrice',
        width: "6%",
        render: (text, record) => {
        return ((text * Math.pow(10, -18) * record.gas).toFixed(8)*this.state.exchange).toFixed(2);
        },
      },


      {
        title: 'Internal tx',
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
        width: "12%",
        render: (text, record) => {

          return(
          <div>
<SelectType optionsInt={this.state.options} record={record}  />
          </div>
        )},
      },

    ];
    return (
      <div className="exchangeDiv">

        <div className="tableList">
          <div className="table-operations">

          <Menuelist setPromise={ this.setPromise}/>
            <Button icon="download">
              <CSVLink filename={"export.csv"} data={(this.state.csvData) ? (this.state.csvData) : []}>Xero
                feed(csv)</CSVLink>
            </Button>
            <div className="exchangeDiv">1 ETH = {this.state.exchange}USD</div>
          </div>
          <Table 
             rowKey={record => record._id}
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



