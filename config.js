//dev

var config = {
 
  debug: true,
  dbConfig:'mongodb://localhost:27017/demo',//mongodb://mongodb/blockeeper
  schedule:'1 * * * * *',
  hardcode_address:'0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
  key:'&apikey=E9MYVKUN5TNUBH6P4E5IWEUHAXGZCXQSNV',
  baseUrl_dev:'http://127.0.0.1:3001/api/',//http://127.0.0.1:3001/api/
  timeDiff:16000
};
module.exports = config;

