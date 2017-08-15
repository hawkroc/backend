import { Factory } from 'meteor/dburles:factory'
import { resetDatabase } from 'meteor/xolvio:cleaner'

import { chai } from 'meteor/practicalmeteor:chai'
import faker from 'faker'

import Profiles from '../../../imports/api/profiles/profiles'


/**
 * TODO: once the user model is correctly wire up and implemented, we'll 
 * need a lot of tests designed around testing permissions over profiles.
 * 
 */

describe('Profiles collection API', function () {
    beforeEach(function () {
        resetDatabase();
    })

    it('Adds a new label type to current profile', function () {

        let profile = Factory.create('profile')
        let initialLabelTypeCount = profile.labelTypes.length;

        let labelTypeName = faker.lorem.sentence(),
            labelTypeGst = faker.random.boolean()

        Meteor.call(
            'profiles.active.insert.labelType',
            { name: labelTypeName, gst: labelTypeGst }
        )

        let newLabelTypeCount = Profiles.active().labelTypes.length
        chai.assert.equal(newLabelTypeCount, initialLabelTypeCount + 1, "There is exactly one more label type available");

        let newLabelTypeDetailCount = Profiles.active().labelTypes
            .filter(lt => lt.name == labelTypeName && lt.gst == labelTypeGst)
            .length

        // Ensure only one label has these details.
        chai.assert.equal(newLabelTypeDetailCount, 1, "Only one label type has our specified details")
    })

    it('Removes an existing label type from the current profile', function () {
        let profile = Factory.create('profile')
        let initialLabelTypeCount = profile.labelTypes.length;

        chai.assert.isAbove(initialLabelTypeCount, 0, "Initial label types exist to delete")

        let labelTypeToDeleteId = profile.labelTypes[0]._id

        Meteor.call(
            'profiles.active.delete.labelType',
            { _id: labelTypeToDeleteId }
        )

        // Make sure we have exactly one less label type.
        let newLabelTypeCount = Profiles.active().labelTypes.length
        chai.assert.equal(newLabelTypeCount, initialLabelTypeCount - 1, "There is exactly one less label type available");

        let newLabelTypeDetailCount = Profiles.active().labelTypes
            .filter(lt => lt._id == labelTypeToDeleteId)
            .length

        // Make sure the correct label was deleted.
        chai.assert.equal(newLabelTypeDetailCount, 0, "We deleted the correct label type")
    })
})