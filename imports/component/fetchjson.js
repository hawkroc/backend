import axios from 'axios';
import { Promise } from 'meteor/promise';
import { Meteor } from 'meteor/meteor';
import { Records } from '../api/records.js';
import {Settings} from '../api/settings.js';
var currentNumber;

const config = require('../config/config');
export const GetdataFromApi = (start, end, configaddress, isFirst) => {

    if (!isFirst) {
        end = end > 0 ? currentNumber : Math.round(end) + currentNumber;
        start = start > 0 ? currentNumber : Math.round(start) + currentNumber;
    }
 
   
    let promise = new Promise((resolve, reject)=> {
     Meteor.call('records.searchRecords', start, end, config.address, (err, res)=> {
        if (err) reject(err);
        else resolve(res);
      });
    });
  //  console.log(JSON.stringify(temp));

    return promise;
}




const currentBlock = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber"

export const GetCurrentBlock = (address) => {
    let final = currentBlock + config.key;
    //  console.log(final);
    return axios.get(final).then(
        (response) => {
            currentNumber = parseInt(response.data.result, 16);

            return GetdataFromApi(1, currentNumber, address, true);
        }
    );
}


const groupBy = "groupby/test"

export const GroupBy = (address) => {
    let final = config.baseUrl_dev + groupBy;
    //   console.log(final);
    return axios.get(final).then(
        (response) => {
            return response;
        }
    );
}

// const createConfig = "createConfig";
export const SaveConfig = (cg) => {
 console.log(JSON.stringify(cg));
  
    let promise = new Promise((resolve, reject)=> {
     Meteor.call('settings.createOrUpdate', cg.userId,cg, (err, res)=> {
        if (err) reject(err);
        else resolve(res);
      });
    });
  //  console.log(JSON.stringify(temp));

    return promise;

}


const getSetting = "getSetting";
export const GetSetting = () => {

 
    let promise = new Promise((resolve, reject)=> {
     Meteor.call('settings.findByUserId',123, (err, res)=> {
        if (err) reject(err);
        else resolve(res);
      });
    });


    return promise;

}

// const updateTypeUrl = "updateType";
// export const UpdateType = (id, type) => {


//     let final = config.baseUrl_dev + updateTypeUrl;
//     // console.log("this is config ?"+config.toString());
//     let cg = { "id": id, "type": type };
//     let authOptions = {
//         method: 'POST',
//         url: final,
//         data: cg,
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         json: true
//     };

//     return axios(authOptions)
//         .then(res => {
//             console.log(res);

//         })
//         .catch(err => {

//         })



// }


export const UpdateType = (id, type) => {

  let promise = new Promise((resolve, reject)=> {
     Meteor.call('records.updateRecorder', id, type, (err, res)=> {
        if (err) reject(err);
        else resolve(res);
      });
    });
  //  console.log(JSON.stringify(temp));

    return promise;


}




//ETH BTC
const exchange = "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
export const GetExchange = (type) => {
    console.log(exchange);
    return axios.get(exchange).then(
        (response) => {

            return response.data.USD;
        });
}

const balance = "https://api.etherscan.io/api?module=account&action=balance&tag=latest" + config.key + "&address=";

export const GetBalance = (address) => {
    let final = balance + address;
    return axios.get(final).then(
        (response) => {

            return response.data.result;
        });
}