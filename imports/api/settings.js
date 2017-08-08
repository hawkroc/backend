import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Settings = new Mongo.Collection('settings');
if (Meteor.isServer) {
    // This code only runs on the server
    // must have an allow function on server to use batchInsert() on client.


    Meteor.publish('settings', function settingsPublication() {
        return Settings.find({
            $or: [
                { private: { $ne: true } },
                { owner: this.userId },
            ],
        });
    });
}

Meteor.methods({

    'settings.createOrUpdate' (userId, configs) {
        //  check(text, String);


        return Settings.remove({ userId: userId }, (err) => {
            if (err) {

                return err;
            }
            Settings.insert(configs);

        });
    },



    'settings.findByUserId' (userId) {
        //  check(text, String);
        console.log('find be invoked ' + userId);
        let result = Settings.find({userId:userId}).fetch();
        if (!result) {
            result = {};
         
        }
          // console.log("this is result" + JSON.stringify(result));
        return result;
    },


});