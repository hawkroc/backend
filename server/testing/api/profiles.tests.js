import { Factory } from 'meteor/dburles:factory'
import { resetDatabase } from 'meteor/xolvio:cleaner'

import { chai } from 'meteor/practicalmeteor:chai'
import faker from 'faker'

import Profiles from '../../../imports/api/profiles/profiles'

import labelMethodTypes from '../../../imports/api/profiles/methods/labelMethodTypes'
import trackedAccountMethodTypes from '../../../imports/api/profiles/methods/trackedAccountMethodTypes'


/**
 * TODO: once the user model is correctly wired up and implemented, we'll 
 * need a lot of tests designed around ownership over profiles.
 * 
 */

describe('Profiles collection API', function () {
    beforeEach(function () {
        resetDatabase();
    })

    it('Adds a new label type to active profile', function () {

        let profile = Factory.create('profile')
        let initialLabelTypeCount = profile.labelTypes.length;

        let labelTypeName = faker.lorem.sentence(),
            labelTypeGst = faker.random.boolean()

        Meteor.call(
            labelMethodTypes.PROFILE_INSERT_LABELTYPE,
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

    it('Removes an existing label type from the active profile', function () {
        let profile = Factory.create('profile')
        let initialLabelTypeCount = profile.labelTypes.length;

        chai.assert.isAbove(initialLabelTypeCount, 0, "Initial label types exist to delete")

        let targetIndex = faker.random.number({
            'min': 0,
            'max': initialLabelTypeCount -1
        });

        let labelTypeToDeleteId = profile.labelTypes[targetIndex]._id

        Meteor.call(
            labelMethodTypes.PROFILE_DELETE_LABELTYPE,
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

    it('Removes labels associated with deleted label type', function () {
        let profile = Factory.create('profile')
        let initialLabelTypeCount = profile.labelTypes.length;

        chai.assert.isAbove(initialLabelTypeCount, 1, "There are at least 2 label types to delete and compare")

        let targetIndex = faker.random.number({
            'min': 0,
            'max': initialLabelTypeCount -1
        });

        let targetLabelTypeId = profile.labelTypes[targetIndex]._id
        let altLabelTypeId = profile.labelTypes.find(lt => lt._id != targetLabelTypeId)._id

        const addLabel = (txId, labelTypeId) => {
            Meteor.call(
                labelMethodTypes.PROFILE_UPDATE_LABEL,
                { txId, labelTypeId }
            )
        }

        // Add some labels for the existing label types.
        addLabel("0", targetLabelTypeId)
        addLabel("1", altLabelTypeId)
        addLabel("2", targetLabelTypeId)
        addLabel("3", altLabelTypeId)

        // Assume labels were added correctly? - Not what we're testing here.

        // Remove the target label type.
        Meteor.call(
            labelMethodTypes.PROFILE_DELETE_LABELTYPE,
            { _id: targetLabelTypeId }
        )

        chai.assert.equal(Profiles.active().labels.length, 2, "Exactly 2 matching labels were removed")

        let targetLabelCount = Profiles.active().labels.filter(l => l._id === targetLabelTypeId).length
        chai.assert.equal(targetLabelCount, 0, "Labels corresponding to deleted label type have been removed")
    })

    it('Updates an existing label type in the active profile', function () {
        let profile = Factory.create('profile')
        let initialLabelTypeCount = profile.labelTypes.length;

        let targetIndex = faker.random.number({
            'min': 0,
            'max': initialLabelTypeCount -1
        });

        chai.assert.isAbove(initialLabelTypeCount, 1, "At least 2 initial label types exist to attempt to update")

        let labelTypeToUpdateId = profile.labelTypes[targetIndex]._id
        let labelTypeInitialGst = profile.labelTypes[targetIndex].gst

        let updatedLabelTypeName = faker.lorem.sentence()

        Meteor.call(
            labelMethodTypes.PROFILE_UPDATE_LABELTYPE,
            { _id: labelTypeToUpdateId, name: updatedLabelTypeName, gst: !labelTypeInitialGst }
        )

        let newLabelTypeCount = Profiles.active().labelTypes.length
        chai.assert.equal(newLabelTypeCount, initialLabelTypeCount, "There is no change to the number of label types");

        let updatedLabelType = Profiles.active().labelTypes
            .find(lt => lt._id == labelTypeToUpdateId)

        let miscLabelType = Profiles.active().labelTypes
            .find(lt => lt._id != labelTypeToUpdateId)

        chai.assert.isObject(updatedLabelType, "Our updated label type still exists")

        // Make sure the correct label was updated.
        chai.assert.equal(updatedLabelType.name, updatedLabelTypeName, "The target label type name was updated")
        chai.assert.equal(updatedLabelType.gst, !labelTypeInitialGst, "The target label type GST value was updated")
        chai.assert.notEqual(miscLabelType.name, updatedLabelTypeName, "Other label type name was not updated")
    })
})