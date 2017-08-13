import { SelectType } from 'antd'

export default  [
      {
        title: 'Time',
        dataIndex: 'timeStamp',
        key: 'timeStamp',
        width: "10%",
        render: (text) => {
          return new Date(parseInt(text) * 1000).toLocaleDateString();
        },
        sorter: (a, b) => a.timeStamp - b.timeStamp,
        //sortOrder: sortedInfo.columnKey === 'timeStamp' && sortedInfo.order,
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
        //filteredValue: filteredInfo.contractAddress || null,
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