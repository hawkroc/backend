import axios from 'axios';

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
