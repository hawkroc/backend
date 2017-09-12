import { Meteor } from 'meteor/meteor'

export default {
    generate: () => {
        let fixtures = [
            {
                _id: new Meteor.Collection.ObjectID().toHexString(),
                address: '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae',
                transactions: [],
                latestMinedBlock: 0,
                balance: 0
            }
        ]

        return fixtures
    }
}
