const Record = require('../model/records');

// var Potato = mongoose.model('Potato', PotatoSchema);

// var potatoBag = [/* a humongous amount of potato objects */];

// Potato.collection.insert(potatoBag, onInsert);

// function onInsert(err, docs) {
//     if (err) {
//         // TODO: handle error
//     } else {
//         console.info('%d potatoes were successfully stored.', docs.length);
//     }
// }

CreateRecords = (array, address) => {

    array.map((item) => {
        item.time = new Date(item.timeStamp * 1000).toLocaleDateString();
        item.address = address;
        item.blockNumber = parseInt(item.blockNumber);
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
                address:"$address",
                value:"$value",
                gas:"$gas",
                gasPrice:"$gasPrice",
                year: { $year: "$time" },
                month: { $month: "$time" },
                day: { $dayOfMonth: "$time" },

            }
        }, 
        {
            $group: {
             _id : {year:"$year",month:"$month"},
           totalPrice: { $sum: { $multiply: [ "$gas", "$gasPrice" ] }},
           
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

// GetDataRecords = () => {

//     return Record.aggregate([{
//             $project: {
//                 address: "$address",
//                 value: "$value",
//                 gas: "$gas",
//                 gasPrice: "$gasPrice",
//                 year: { $year: "$time" },
//                 month: { $month: "$time" },
//                 day: { $dayOfMonth: "$time" },

//             }
//         }, {
//             $group: {
//                 _id: { year: "$year", month: "$month" },
//                 totalPrice: { $sum: { $multiply: ["$gas", "$gasPrice"] } },

//             }
//         }

//     ], (err, result) => {
//         if (err) {

//             console.log("this is error ");
//         } else {
//             // let rs=JSON.stringify(result);
//             console.log("this is successfully ");
//             //  JSON.stringify(result);
//             return result;
//         }
//     });



// }

