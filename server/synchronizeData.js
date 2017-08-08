//const address="0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
const base="http://api.etherscan.io/api?"
const accountUrl="module=account&action=txlist&address=";
const currentBlock="module=proxy&action=eth_blockNumber";
const config = require('../imports/config/config');
const  axios = require('axios');

//var blockStart=1;
//"&startblock=11063&endblock=4009538&sort=asc"

  GetCurrentBlock = () => {
    let final = base+currentBlock + config.key;
   // console.log("this is getData url "+final);
   return axios.get(final).then(
   	(response) =>{  
       response.data.result=parseInt(response.data.result, 16);
     // console.log("this is currentNumber  "+response.data.result);
   		return  response;
   	}
   	);
}


 GetdataFromApi = (startblock, endblock,address) => { 
 let final = base+accountUrl+address+"&startblock="+startblock+"&endblock="+endblock+"&sort=asc" + config.key;
  //  console.log(final);
   // timeStamp
   return axios.get(final).then((response)=>{
  // response.data.result=[..., Date(parseInt(timeStamp) * 1000).toLocaleDateString()];


   	return response;
   })
};


