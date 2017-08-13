import { Mongo } from 'meteor/mongo'

import ProfileSchema from './profileSchema'

class ProfilesCollection extends Mongo.Collection { }
const Profiles = new ProfilesCollection('profiles')

// Don't let the client update the collection for now.
// The server can still use all of these just fine.
Profiles.deny({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})

Profiles.attachSchema(ProfileSchema)

// Fields of the collection items that are made available to the client.
Profiles.publicFields = {
    userInfo: 1,
    accounts: 1,
    labels:1
}

// Attach helpers to the collection object.
Profiles.helpers({
    // TODO:
    // transactions () {
    //     return transactions.find({ account: this.address }, { sort: { createdAt: -1 } });
    // }
})

export default Profiles;