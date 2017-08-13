const base = "http://api.etherscan.io/api?"
const accountUrl = "module=account&action=txlist&address=";
const currentBlock = "module=proxy&action=eth_blockNumber";
const config = require('../imports/config/config');
const axios = require('axios');
import Accounts from '../imports/api/accounts/accounts';
import {Meteor} from 'meteor/meteor';
GetCurrentBlock = () => {
  let final = base + currentBlock + config.key;
  // console.log("this is getData url "+final);
  return axios
    .get(final)
    .then((response) => {
      response.data.result = parseInt(response.data.result, 16);
      // console.log("this is currentNumber  "+response.data.result);
      return response;
    });
}

GetdataFromApi = (startblock, endblock, address) => {
  let final = base + accountUrl + address + "&startblock=" + startblock + "&endblock=" + endblock + "&sort=asc" + config.key;
console.log("this url "+final);
  return axios
    .get(final)
    .then((response) => {
   

      return response;
    })
};

SynchronizeDataFromApi = () => {

  return GetCurrentBlock().then((response) => {
    let end = response.data.result;
    let accountsList = Accounts
      .find()
      .fetch();
    for (let account of accountsList) {
      GetdataFromApi(account.latestMinedBlock,end, account.address).then((response) => {
        //3946145,4013330
        //account.latestMinedBlock,end
        let res = response.data.result;
      console.log("this is  transactions  " + JSON.stringify(res.length));
        account.transactions = [
          ...account.transactions,
          ...res
        ];
        if (res) {
          account.latestMinedBlock = parseInt(res.slice(-1)[0].blockNumber);
        }

       console.log("this is new transactions  " + JSON.stringify(account));

        // Accounts.update({   '_id': account._id }, {   $set: {'latestMinedBlock':
        // account.latestMinedBlock}},  {$push: {'transactions':account.transactions}});
       // let transactionsTemp=[{blockNumber:1234,timeStamp:3456},{blockNumber:45,timeStamp:789}];
      //  account.transactions=[...account.transactions,...transactionsTemp];
       
      Accounts.remove({
          '_id': account._id
        }, (err, res) => {
          if (res) {
   
            return Accounts.insert(account,(err,res)=>{
              console.log(JSON.stringify(res));
            });
          }
          return null;
        });

      });

    }
  });
}
