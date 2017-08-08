import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Records = new Mongo.Collection('records');
if (Meteor.isServer) {
    // This code only runs on the server
    // must have an allow function on server to use batchInsert() on client.


    Meteor.publish('records', function recordsPublication() {
        return Records.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({
    'records.searchRecords' (start, end, address) {
        // check(text, String);
        console.log('searchRecords the records');

        let test = Records.find({
            $and: [
                { blockNumber: { $gt: start } },
                { blockNumber: { $lt: end } },
                { $or: [{ from: address }, { to: address }] },
            ]
        }).fetch();

        return test;
    },

    'records.batchInsert' (array, address) {

        if (array.length > 0) {
            array.map((item) => {
                item.time = new Date(item.timeStamp * 1000).toLocaleDateString();
                item.address = address;
                item.blockNumber = parseInt(item.blockNumber);
                item.type = null;
            });
            //insertMany do not  work 
            for (let t of array) {
                Records.insert(t);
                console.log(JSON.stringify(t));
            }
        }

        // console.log(JSON.stringify(array));
        return {};

    },

    'records.getCount' () {
        //  check(text, String);
        return Records.find().count();


    },

    'records.updateRecorder' (id, type) {
        console.log("update this is invoked ");
        return Records.update({ '_id': id }, { $set: { 'type': type } }, (err, result) => {
            if (err) {

                console.log("this is error ");
            } else {
                console.log(JSON.stringify(result));
                return result;
            }
        });



    },

    'records.remove' () {
        console.log('remove the records');
        Records.remove({});
        return {};
    },



    'records.getMaxBlock' (address) {

        let temp = Records.findOne({ to: address }, { sort: { blockNumber: -1 } });

        if (temp === null || typeof temp === 'undefined') {
            temp = 1;
        } else {
            temp = parseInt(temp.blockNumber) + 1;
        }
        return temp;
    },


});