import React from "react";
import { Select, Icon } from "antd";

const weiToEther = value => (value * Math.pow(10, -18)).toFixed(8);

export const buildColumns = ({
  addressAliasLookup,
  usdExchangeRate,
  labelTypes,
  transactionLabels,
  currencies,
  onLabelUpdated
}) => {
  // Mask an account address with an alias if found.
  // Otherwise default to its address.
  const accountAliasMask = address => {
    let mapping = addressAliasLookup.find(a => a.address === address);

    if (mapping) {
      return mapping.trackedAccount.alias;
    } else {
      return address.substring(0, 12) + "...";
    }
  };

  const findTransactionLabel = txId => {
    let label = transactionLabels.find(l => l.transactionId == txId);
    if (label) {
      return label.labelTypeId;
    }

    return undefined;
  };

  return [
    {
      title: "Time",
      dataIndex: "timeStamp",
      key: "timeStamp",
      width: "4%",
      sortOrder: "descend",

      render: text => {
        return new Date(parseInt(text) * 1000).toLocaleDateString();
      },

      sorter: (a, b) => a.timeStamp - b.timeStamp
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      width: "9%",

      render: (text, record) =>
        <div className="editable-cell">
          <div className="editable-cell-text-wrapper">
            {accountAliasMask(text)}
            <Icon
              style={{ fontSize: 16 }}
              title="Copy address to clipboard"
              type="copy"
              className="editable-cell-icon"
              onClick={() => alert("Address copied to clipboard!")}
            />
          </div>
        </div>
    },

    {
      title: "To",
      dataIndex: "to",
      key: "to",
      width: "9%",

      render: (text, record) =>
        <div className="editable-cell">
          <div className="editable-cell-text-wrapper">
            {accountAliasMask(text)}
            <Icon
              style={{ fontSize: 16 }}
              title="Copy address to clipboard"
              type="copy"
              className="editable-cell-icon"
              onClick={() => alert("Address copied to clipboard!")}
            />
          </div>
        </div>
    },
    {
      title: "ETH",
      dataIndex: "gas",
      key: "gas",
      width: "6%",

      render: (text, record) => {
        return weiToEther(text * record.gasPrice);
      }
    },
    {
      title: "USD(Current rate)",
      dataIndex: "gasPrice",
      key: "gasPrice",
      width: "6%",

      render: (text, record) => {
        return (weiToEther(text * record.gas) * usdExchangeRate).toFixed(2);
      }
    },

    {
      title: "USD(exchange rate)",
      dataIndex: "gasPrice",
      key: "gasPriceRate",
      width: "6%",
      render: (text, record) => {
        let tp = new Date(
          parseInt(record.timeStamp) * 1000
        ).toLocaleDateString();
        let rate = [];
        if (currencies) {
          rate = currencies.hisCurrency.filter(a => {
            let time = new Date(parseInt(a.time)).toLocaleDateString();
            return time === tp;
          });
        }
       return  (weiToEther(text * record.gas) * (rate[0] ? rate[0].average : 0)).toFixed(2);

      }
    },
    {
      title: "ETH/BTC",
      dataIndex: "gasPrice",
      key: "gasPriceBTC",
      width: "6%",

      render: (text, record) => {
        return 0
      }
    },

    {
      title: "Internal",
      dataIndex: "contractAddress",
      key: "contractAddress",
      width: "4%",

      render: text => {
        return text === "" ? "" : "Internal";
      },

      filters: [{ text: "No", value: "No" }, { text: "Yes", value: "Yes" }],
      onFilter: (value, record) => {
        record.contractAddress.includes(value);
      }
    },
    {
      title: " Label",
      key: "type",
      width: "12%",
      render: (text, record) => {
        let labelTypeId = findTransactionLabel(record._id);

        return (
          <div>
            <Select
              showSearch
              value={labelTypeId}
              onChange={labelTypeId =>
                onLabelUpdated({ txId: record._id, labelTypeId })}
              style={{ width: "100%" }}
              placeholder="Select a label"
              optionFilterProp="name"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0}
            >
              {labelTypes.map(lt => {
                return (
                  <Select.Option value={lt._id} key={lt._id}>
                    {lt.name}
                  </Select.Option>
                );
              })}
            </Select>
          </div>
        );
      }
    }
  ];
};
