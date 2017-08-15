import { Factory } from 'meteor/dburles:factory';

const createId = () => {
    return new Meteor.Collection.ObjectID().toHexString();
}

export const initializeFactory = (profilesCollection) => {
    Factory.define('profile', profilesCollection, {
        _id: createId(),

        info: {
            _id: createId(),
            username: "text-fixture@centrality.ai"
        },

        trackedAccounts: [ ],

        labelTypes: [
            {
                _id: createId(),
                name: "Test fixture label 1",
                gst: false
            },
            {
                _id: createId(),
                name: "Test fixture label 2",
                gst: true
            }
        ],

        labels: [ ]
    })
}