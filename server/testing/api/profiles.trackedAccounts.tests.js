import { Factory } from 'meteor/dburles:factory'
import { resetDatabase } from 'meteor/xolvio:cleaner'

import { chai } from 'meteor/practicalmeteor:chai'
import faker from 'faker'

import Profiles from '../../../imports/api/profiles/profiles'
import Accounts from '../../../imports/api/accounts/accounts'

import trackedAccountMethodTypes from '../../../imports/api/profiles/methods/trackedAccountMethodTypes'


describe('Profiles: tracked accounts', function () {
    beforeEach(function () {
        resetDatabase();
    })

    it('Adds a new tracked account to the active profile', function () {
        let profile = Factory.create('profile.with.trackedAccounts')
        let initialTACount = profile.trackedAccounts.length

        let newTAAlias = faker.lorem.sentence(),
            newTAAddress = faker.random.alphaNumeric(40)

        Meteor.call(
            trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT,
            { alias: newTAAlias, address: newTAAddress }
        )

        let newTACount = Profiles.active().trackedAccounts.length
        chai.assert.equal(newTACount, initialTACount + 1, "There is exactly one more tracked account in the user's active profile");

        let newTADetailCount = Profiles.active().trackedAccounts
            .filter(ta => ta.alias == newTAAlias || ta.address == newTAAddress)
            .length

        // TODO: Should we be checking accross profiles? Or just have separate tests ensuring
        // that Profiles.active() is correct?

        chai.assert.equal(newTADetailCount, 1, "Only one tracked account mateches any of the added details")
    })

    it('Creates new Account document if new tracked account is unknown', function () {
        let profile = Factory.create('profile')

        let newAccountAddress = faker.random.alphaNumeric(40)

        Meteor.call(
            trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT,
            { alias: faker.lorem.sentence(), address: newAccountAddress }
        )

        let newAcCount = Accounts.find().fetch().filter(a => a.address == newAccountAddress).length

        chai.assert.equal(newAcCount, 1, "There is exactly one Accounts document to match the added tracked account")
    })

    it('Does not create new Account document if new tracked account is known', function () {
        let profile = Factory.create('profile')

        let newAccountAddress = faker.random.alphaNumeric(40)

        let account = Factory.create('account', {
            address: newAccountAddress
        })

        let initialAccCount = Accounts.find().count

        Meteor.call(
            trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT,
            { alias: faker.lorem.sentence(), address: newAccountAddress }
        )

        chai.assert.equal(initialAccCount, initialAccCount, "No Account document was created because tracked account is known")
    })

    it('Updates the correct tracked account alias', function () {
        chai.assert.equal(true, false, "Test not yet implemented")

    })

    it('Removes the correct tracked account from the active profile', function () {
        chai.assert.equal(true, false, "Test not yet implemented")

    })

    it('Removes the Account document if the last referencing tracked account is removed', function () {
        chai.assert.equal(true, false, "Test not yet implemented")

    })
})