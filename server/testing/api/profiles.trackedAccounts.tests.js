import { Factory } from "meteor/dburles:factory";
import { resetDatabase } from "meteor/xolvio:cleaner";

import { chai } from "meteor/practicalmeteor:chai";
import faker from "faker";

import Profiles from "../../../imports/api/profiles/profiles";
import Accounts from "../../../imports/api/accounts/accounts";

import trackedAccountMethodTypes from "../../../imports/api/profiles/methods/trackedAccountMethodTypes";

describe("Profiles: tracked accounts", function() {
  beforeEach(function() {
    resetDatabase();
  });

  it("Adds a new tracked account to the active profile", function() {
    let profile = Factory.create("profile.with.trackedAccounts");
    let initialTACount = profile.trackedAccounts.length;

    let newTAAlias = faker.lorem.sentence(),
      newTAAddress = faker.random.alphaNumeric(40);

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: newTAAlias,
      address: newTAAddress
    });

    let newTACount = Profiles.active().trackedAccounts.length;
    chai.assert.equal(
      newTACount,
      initialTACount + 1,
      "There is exactly one more tracked account in the user's active profile"
    );

    let newTADetailCount = Profiles.active().trackedAccounts.filter(
      ta => ta.alias == newTAAlias || ta.address == newTAAddress
    ).length;

    chai.assert.equal(
      newTADetailCount,
      1,
      "Only one tracked account mateches any of the added details"
    );
  });

  it("Creates new Account document if new tracked account is unknown", function() {
    let profile = Factory.create("profile");

    let newAccountAddress = faker.random.alphaNumeric(40);

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: faker.lorem.sentence(),
      address: newAccountAddress
    });

    let newAcCount = Accounts.find()
      .fetch()
      .filter(a => a.address == newAccountAddress).length;

    chai.assert.equal(
      newAcCount,
      1,
      "There is exactly one Accounts document to match the added tracked account"
    );
  });

  it("Does not create new Account document if new tracked account is known", function() {
    let profile = Factory.create("profile");

    let newAccountAddress = faker.random.alphaNumeric(40);

    let account = Factory.create("account", {
      address: newAccountAddress
    });

    let initialAccCount = Accounts.find().count();

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: faker.lorem.sentence(),
      address: newAccountAddress
    });

    chai.assert.equal(
      initialAccCount,
      Accounts.find().count(),
      "No Account document was created because tracked account is known"
    );
  });

  it("Updates the correct tracked account alias", function() {
    let profile = Factory.create("profile.with.trackedAccounts");
    let initialTrackedAccountCount = profile.trackedAccounts.length;

    chai.assert.isAbove(
      initialTrackedAccountCount,
      1,
      "There are at least two tracked accounts for comparison"
    );

    // Choose a random tracked account to update.
    let targetIndex = faker.random.number({
      min: 0,
      max: initialTrackedAccountCount - 1
    });

    let targetId = profile.trackedAccounts[targetIndex]._id;

    let newTargetAlais = faker.lorem.sentence();

    Meteor.call(trackedAccountMethodTypes.PROFILE_UPDATE_TRACKEDACCOUNT, {
      _id: targetId,
      alias: newTargetAlais
    });

    let updatedTAs = Profiles.active().trackedAccounts.filter(
      ta => ta.alias == newTargetAlais
    );

    chai.assert.equal(
      updatedTAs.length,
      1,
      "Exactly one tracked account has the updated alias."
    );

    chai.assert.equal(
      updatedTAs[0]._id,
      targetId,
      "The targeted tracked account was the updated account."
    );
  });

  it("Removes the correct tracked account from the active profile", function() {
    let profile = Factory.create("profile.with.trackedAccounts");
    let initialTrackedAccountCount = profile.trackedAccounts.length;

    chai.assert.isAbove(
      initialTrackedAccountCount,
      1,
      "There are at least two tracked accounts for comparison"
    );

    // Choose a random tracked account to update.
    let targetIndex = faker.random.number({
      min: 0,
      max: initialTrackedAccountCount - 1
    });

    let targetId = profile.trackedAccounts[targetIndex]._id;

    Meteor.call(trackedAccountMethodTypes.PROFILE_DELETE_TRACKEDACCOUNT, {
      _id: targetId
    });

    let tas = Profiles.active().trackedAccounts;

    chai.assert.equal(
      tas.length,
      initialTrackedAccountCount - 1,
      "There was exactly one tracked account deleted"
    );
    chai.assert.equal(
      tas.filter(ta => ta._id == targetId),
      0,
      "No tracked account with the target ID remains"
    );
  });

  it("Does not allow a profile to track an account multiple times", function() {
    // Meteor.call returns an error?
    let profile = Factory.create("profile");
    let targetAccountAddress = faker.random.alphaNumeric(40)

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: faker.lorem.sentence(),
      address: targetAccountAddress
    });

    let firstTACount = Profiles.active().trackedAccounts.length

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: faker.lorem.sentence(),
      // Attempt to track the same address again.
      address: targetAccountAddress
    });

    let secondTACount = Profiles.active().trackedAccounts.length; // profile.trackedAccounts.length

    chai.assert.equal(
      firstTACount,
      secondTACount,
      "No extra tracked account entry was added when attempting to attract same address"
    );
  });

  it("Retains the Account document after one of many referencing tracked accounts is removed", function() {
    //add two different user to DB
    Factory.create("profile")
    Factory.create("profile.2")

    const nonActiveProfile = Profiles.findOne({ _id: { $ne: Profiles.active()._id }})
    const targetAddress = faker.random.alphaNumeric(40)

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: faker.lorem.sentence(),
      address: targetAddress
    });

    // Manually push the tracked account since we don't have a good handle on other
    // 'non-active' accounts yet.
    Profiles.update(nonActiveProfile._id, {
      $push: {
        'trackedAccounts': {
            _id: new Meteor.Collection.ObjectID().toHexString(),
            alias: faker.lorem.sentence(), 
            accountId: Accounts.findOne()._id
        }
      }
    })

    chai.assert(Accounts.find().count(), 1, "There is exactly one Account document tracked by two profiles")

    // Delete the tracked account on the active profile.
    Meteor.call(trackedAccountMethodTypes.PROFILE_DELETE_TRACKEDACCOUNT, {
      _id: Profiles.active().trackedAccounts[0]._id
    });

    chai.assert.equal(Accounts.find().count(), 1, "The account was not removed due to other tracking profile");
  });

  it("Removes the Account document if the last referencing tracked account is removed", function() {
    let profile = Factory.create("profile");
    
    let newAccountAddress = faker.random.alphaNumeric(40);

    chai.assert.equal(Accounts.find().count(), 0, "No accounts currently exist")

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: faker.lorem.sentence(),
      address: newAccountAddress
    });

    chai.assert.equal(Accounts.find().count(), 1, "One account exists corresponding to added tracked account")

    Meteor.call(trackedAccountMethodTypes.PROFILE_DELETE_TRACKEDACCOUNT, {
      _id: Profiles.active().trackedAccounts[0]._id
    });

    chai.assert.equal(Accounts.find().count(), 0, "Account corresponding to last tracked account was removed")
  });
});
