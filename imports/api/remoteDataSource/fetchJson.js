import axios from 'axios';
import config from '../../config/config'

/**
 * get Exchange from cryptocompare the default type is USD
 */
const url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms='
export const GetExchange = (type = 'USD') => {
  let final = url + type;
  return axios
    .get(final)
    .then((response) => {
      
     return  response;
    })
    .catch(error => {
      throw(error);
    });
}


const balanceUrl="https://api.etherscan.io/api?module=account&action=balance&tag=latest"+config.key+"&address=";

export const GetBalance = (address) => {
  let final = balanceUrl+address;
  console.log(final);
   return axios.get(final).then(
    (response) =>{  
    
      return response;
    }).catch(error => {
      throw(error);
    });
}

