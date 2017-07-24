import axios from 'axios';
const url = "http://api.etherscan.io/api?module=account&action=txlist&address=";
const key = "&apikey=E9MYVKUN5TNUBH6P4E5IWEUHAXGZCXQSNV";
const urlLocal="http://127.0.0.1:3001/api/search/";
var currentNumber;
const baseUrl="http://127.0.0.1:3001/api/";
//test
export const GetdataFromApi = (start, end,configaddress,isFirst) => { 
  if(!isFirst){
       end=end>0?currentNumber:Math.round(end)+currentNumber;
        start=start>0?currentNumber:Math.round(start)+currentNumber;
      }
    //let final = url +configaddress+"&startblock="+ start + "&endblock=" + end + "&sort=desc" + key;
   let final=urlLocal+start+"/"+end;
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
    let final = currentBlock + key;
    console.log(final);
   return axios.get(final).then(
   	(response) =>{  
       currentNumber=parseInt(response.data.result, 16);
      
   		return  GetdataFromApi(1,currentNumber,address,true);}
   	);
}
const groupBy="groupby/test"

export const GroupBy = (address) => {
    let final =baseUrl+ groupBy;
    console.log(final);
   return axios.get(final).then(
    (response) =>{  
      return response;
    }
    );
}

const createConfig="createConfig";
export const SaveConfig = (config) => {
    let final =baseUrl+ createConfig;
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

  
   console.log("this invoked is ok working but error..... "+err) 

 })

}


const getSetting="getSetting";
export const GetSetting = () => {
    let final =baseUrl+ getSetting;
    console.log(final);
   return axios.get(final).then(
    (response) =>{  
      // console.log(response);
      return response;
    });
}

const updateTypeUrl="updateType";
export const UpdateType = (timestamp,type) => {
   

  let final =baseUrl+ updateTypeUrl;
   // console.log("this is config ?"+config.toString());
  let authOptions = {
    method: 'POST',
    url: final,
    id: timestamp,
    type:type,

  };

  return axios(authOptions)
  .then(res=>{
   console.log(res) ;

 })
  .catch(err=>{

 })



}