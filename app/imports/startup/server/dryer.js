import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Dryers } from '../../api/dryer/dryer.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.dryerNumber} (${data.enabled})`);
  Dryers.insert(data);
}

/** Initialize the collection if empty. */
if (Dryers.find().count() === 0) {
  if (Meteor.settings.defaultDryers) {
    console.log('Creating default dryers.');
    Meteor.settings.defaultContacts.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Dryers', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Dryers.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('DryersAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Dryers.find();
  }
  return this.ready();
});
