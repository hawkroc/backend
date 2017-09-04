// dev

let config = {

	debug: true,
	dbConfig: 'mongodb://localhost:27017/demo', // mongodb://mongodb/blockeeper
	// dbConfig:'mongodb://localhost:27017/demo',
	schedule: '1 * * * * *',
	address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
	key: '&apikey=E9MYVKUN5TNUBH6P4E5IWEUHAXGZCXQSNV',
	baseUrlDev: 'http://blockeeper-api.centrality.ai/api/', // http://127.0.0.1:3001/api/
	// baseUrl_dev:'http://127.0.0.1:3001/api/',
	historyCurrency: 'https://apiv2.bitcoinaverage.com/indices/global/history/ETHUSD?period=alltime&?format=json',
	timeDiff: 16000
}
module.exports = config


