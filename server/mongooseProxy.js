const Record = require('../model/records');
const Setting = require('../model/setting');

CreateRecords = (array, address) => {

    array.map((item) => {
        item.time = new Date(item.timeStamp * 1000).toLocaleDateString();
        item.address = address;
        item.blockNumber = parseInt(item.blockNumber);
        item.type = 1;
    });


    return Record.insertMany(array, (err, docs) => {
        if (err) {
            // TODO: handle error
        } else {
            console.info('%d potatoes were successfully stored.', docs.length);
        }


    });

}



GetMaxBlock = () => {

    return Record.findOne()
        // .select('record.blockNumber')
        .sort({ "blockNumber": -1 }) // give me the max
        .exec((err, record) => {
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
                _id: { year: "$year", month: "$month" },
                totalPrice: { $sum: { $multiply: ["$gas", "$gasPrice"] } },

            }
        }

    ]).exec((err, result) => {
        if (err) {

            console.log("this is error ");
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

                console.log("this is error ");
            } else {
                //  console.log(JSON.stringify(result));
                return result;
            }
        });

}

UpdateRecorder = (id, type) => {
    return Record.findById(id, (err, r) => {
        if (err) return handleError(err);

        r.type = type;
        r.save((err, updatedRecord) => {
            if (err) return handleError(err);
            // res.send(updatedTank);
            return updatedRecord;
        });
    });
}


CreateSetting = (alias,labels) => {
    let setting = new Setting();
    setting.alias = alias;
    setting.labels=labels;
    console.log("test is ok2")
 return   setting.save((err) => {
        if (err) {
            console.log("this isdsdf error");
            return err;
        }
    });
}