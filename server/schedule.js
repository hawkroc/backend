const schedule = require('node-schedule');
const synData = require('./synchronizeData');
const mogo = require('./mongooseProxy');
//const address = "0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae";
const config = require('../config');


scheduleCronstyle = () => {
    let start, end;
    schedule.scheduleJob('1 * * * * *', () => {

        GetCurrentBlock().then((response) => {
            end = response.data.result;
            console.log('this is current blcok ' + response.data.result);
            GetMaxBlock(config.address).then((response) => {
                //  console.log("this max number "+response.data.blockNumber);
               // (response) ? start = response.data.blockNumber: 1;
                if (response === null||typeof response === 'undefined') {
                    start = 1;
                } else {
                    start = parseInt(response.blockNumber)+1;
                }
                  console.log(' max blcok ' + start);
                GetdataFromApi(start, end, config.address).then((response) => {

                   CreateRecords(response.data.result, config.address);
                  //  console.log('this get group by '+ GetDataGroupByDate());
                });
            });
        });
    });
}
