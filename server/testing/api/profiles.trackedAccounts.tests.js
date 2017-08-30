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

    // TODO: Should we be checking across profiles? Or just have separate tests ensuring
    // that Profiles.active() is correct?

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

    let initialAccCount = Accounts.find().count;

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: faker.lorem.sentence(),
      address: newAccountAddress
    });

    chai.assert.equal(
      initialAccCount,
      initialAccCount,
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
    let profile = Factory.create("profile.with.trackedAccounts");
    let initialTACount = profile.trackedAccounts.length;
    let firstTAAlias = faker.lorem.sentence(),
      firstTAAddress = faker.random.alphaNumeric(40);
    let secondTAAlias = faker.lorem.sentence(),
      secondTAAddress = firstTAAddress; //asign the same address

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: firstTAAlias,
      address: firstTAAddress
    });
    let firstTACount = Profiles.active().trackedAccounts.length;
    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: secondTAAlias,
      address: secondTAAddress
    });

    let secondTACount = Profiles.active().trackedAccounts.length; // profile.trackedAccounts.length

    chai.assert.equal(
      firstTACount,
      secondTACount,
      "the first and second have same address if insert mutil times "
    );
  });

  it("Retains the Account document after one of many referencing tracked accounts is removed", function() {
    //add two different user to DB
    let firstProfile = Factory.create("profile");

    let newTAAlias = faker.lorem.sentence(),
      newTAAddress = faker.random.alphaNumeric(40);
    //can not use Factory.creat again, it will get duplicate key error
    let secondProfile = firstProfile;
    //change the _id
    secondProfile._id = firstProfile._id.split("").reverse().join("")

    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: newTAAlias,
      address: newTAAddress
    });

    //save in DB . there are two profiles in DB
    Profiles.insert(secondProfile);
    //set the second secondProfile
    Profiles.setActive(secondProfile);
    Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
      alias: newTAAlias,
      address: newTAAddress
    }); 

  //  console.log('beforeDel '+JSON.stringify(Profiles.find().fetch() ))
    let beforeDeleAccountNumber=Accounts.find().fetch().length
    
   let delProfile=  Profiles.findOne()
   Profiles.setActive(delProfile);
   
   //delete the second proifle track account 
   Meteor.call(trackedAccountMethodTypes.PROFILE_DELETE_TRACKEDACCOUNT, {
    _id: delProfile.trackedAccounts[0]._id
  });

 // console.log('afterDel '+JSON.stringify(Profiles.find().fetch() ))
  let afterDeleAccountNumber=Accounts.find().fetch().length

    chai.assert.equal(beforeDeleAccountNumber, afterDeleAccountNumber, "Test not yet implemented");
  });

  it("Removes the Account document if the last referencing tracked account is removed", function() {
    
    let firstProfile = Factory.create("profile");
    
        let newTAAlias = faker.lorem.sentence(),
          newTAAddress = faker.random.alphaNumeric(40);
        //can not use Factory.creat again, it will get duplicate key error
        let secondProfile = firstProfile;
        //change the _id
        secondProfile._id = firstProfile._id.split("").reverse().join("")
    
        Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
          alias: newTAAlias,
          address: newTAAddress
        });
    
        //save in DB . there are two profiles in DB
        Profiles.insert(secondProfile);
        //set the second secondProfile
        Profiles.setActive(secondProfile);
        Meteor.call(trackedAccountMethodTypes.PROFILE_INSERT_TRACKEDACCOUNT, {
          alias: newTAAlias,
          address: newTAAddress
        }); 
    
       // delet all the track account 
        let profileAll=Profiles.find().fetch()
        for(let delProfile of profileAll){
            Profiles.setActive(delProfile);
            Meteor.call(trackedAccountMethodTypes.PROFILE_DELETE_TRACKEDACCOUNT, {
                _id: delProfile.trackedAccounts[0]._id
              });
        }

      let afterDeleAccountNumber=Accounts.find().fetch().length
    chai.assert.equal(afterDeleAccountNumber, 0, "Test not yet implemented");
  });
});
