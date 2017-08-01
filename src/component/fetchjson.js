import axios from 'axios';
//const key = "&apikey=E9MYVKUN5TNUBH6P4E5IWEUHAXGZCXQSNV";
var currentNumber;
//const config.baseUrl_dev="http://127.0.0.1:3001/api/";
const config = require('../../config');
//test
export const GetdataFromApi = (start, end,configaddress,isFirst) => { 
  if(!isFirst){
       end=end>0?currentNumber:Math.round(end)+currentNumber;
        start=start>0?currentNumber:Math.round(start)+currentNumber;
      }
   
   let final=config.baseUrl_dev+"search/"+start+"/"+end;
    console.log("get data from "+final);
    return fetch(final, {
        method: 'get'
    }).then((response) => {
        return response.json();
    }).catch((err) => {
        // Error :(
    });
};

const currentBlock = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber"

export const GetCurrentBlock = (address) => {
    let final = currentBlock + config.key;
  //  console.log(final);
   return axios.get(final).then(
   	(response) =>{  
       currentNumber=parseInt(response.data.result, 16);
      
   		return  GetdataFromApi(1,currentNumber,address,true);}
   	);
}
const groupBy="groupby/test"

export const GroupBy = (address) => {
    let final =config.baseUrl_dev+ groupBy;
 //   console.log(final);
   return axios.get(final).then(
    (response) =>{  
      return response;
    }
    );
}

const createConfig="createConfig";
export const SaveConfig = (config) => {
    let final =config.baseUrl_dev+ createConfig;
   // console.log("this is config ?"+config.toString());
  let authOptions = {
    method: 'POST',
    url: final,
    data: config,
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  };
  return axios(authOptions)
  .then(res=>{
   console.log(res) ;

 })
  .catch(err=>{

  
 //  console.log("this invoked is ok working but error..... "+err) 

 })

}


const getSetting="getSetting";
export const GetSetting = () => {
    let final =config.baseUrl_dev+ getSetting;
 //   console.log(final);
   return axios.get(final).then(
    (response) =>{  
      // console.log(response);
      return response;
    });
}

const updateTypeUrl="updateType";
export const UpdateType = (id,type) => {
   

  let final =config.baseUrl_dev+ updateTypeUrl;
   // console.log("this is config ?"+config.toString());
   let config={"id":id,"type":type};
  let authOptions = {
    method: 'POST',
    url: final,
    data: config,
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  };

  return axios(authOptions)
  .then(res=>{
   console.log(res) ;

 })
  .catch(err=>{

 })



}
//ETH BTC
const exchange="https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD";
export const GetExchange = (type) => {
  console.log(exchange);
   return axios.get(exchange).then(
    (response) =>{  
    
      return response.data.USD;
    });
}

const balance="https://api.etherscan.io/api?module=account&action=balance&tag=latest"+config.key+"&address=";

export const GetBalance = (address) => {
  let final = balance+address;
   return axios.get(exchange).then(
    (response) =>{  
    
      return response.data.result;
    });
}
