const Record = require('../model/records');
const Setting = require('../model/setting');

CreateRecords = (array, address) => {

    array.map((item) => {
        item.time = new Date(item.timeStamp * 1000).toLocaleDateString();
        item.address = address;
        item.blockNumber = parseInt(item.blockNumber);
        item.type = null;
    });


    return Record.insertMany(array, (err, docs) => {
        if (err) {
            // TODO: handle error
        } else {
            console.info('%d records were successfully stored.', docs.length);
        }


    });

}



GetMaxBlock = (address) => {

    return Record.findOne({ 'address': address})
        // .select('record.blockNumber')
        .sort({ "blockNumber": -1 }) // give me the max
        .exec((err, record) => {
            console.log("this is the max number in db "+JSON.stringify(record));
            return record;


        });
}

GetDataGroupByDate = () => {

    return Record.aggregate([{
            $project: {
                address: "$address",
                value: "$value",
                gas: "$gas",
                gasPrice: "$gasPrice",
                year: { $year: "$time" },
                month: { $month: "$time" },
                day: { $dayOfMonth: "$time" },

            }
        },
        {
            $group: {
                // _id:{time:"$time"},
                _id: { year: "$year", month: "$month" },
                totalPrice: { $sum: { $multiply: ["$gas", "$gasPrice"] } },

            }
        }

    ]).exec((err, result) => {
        if (err) {

            console.log("this is error "+ JSON.stringify(err));
        } else {
            //  console.log(JSON.stringify(result));
            return result;
        }
    });
}
GetDataRecords = (start, end) => {
    // console.log("this is be invoked");
    return Record.find()
        .where('blockNumber').gt(start).lt(end)
        .sort('-blockNumber')
        .exec((err, result) => {
            if (err) {

                console.log("this is error "+JSON.stringify(err));
            } else {
                //  console.log(JSON.stringify(result));
                return result;
            }
        });

}

UpdateRecorder = (id, type) => {
//console.log("this is2 type " + type+" this is  id"+id);
return Record.update({ '_id': id }, { $set: { 'type': type}}, (err, result) => {
            if (err) {

                console.log("this is error ");
            } else {
                  console.log(JSON.stringify(result));
                return result;
            }
        });
}


CreateSetting = (alias,labels) => {
    let setting = new Setting();
    setting.alias = alias;
    setting.labels=labels;
    setting.id=123;
  return  Setting.deleteOne({ id: 123 }, (err)=>{
        if(err){
            return err;
        }

 setting.save((err) => {
   // console.log("test is ok"+JSON.stringify(setting));
        if (err) {
          
            return err;
        }
    });

    });
   
}

GetSetting =()=>{
      return Setting.findOne()
        .exec((err, result) => {
            if (err) {

                console.log("this is error ");
            } else {
                //  console.log(JSON.stringify(result));
                return result;
            }
        }); 
}