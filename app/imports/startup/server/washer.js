import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Washers } from '../../api/waasher/washer.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Washers.insert(data);
}

/** Initialize the collection if empty. */
if (Washers.find().count() === 0) {
  if (Meteor.settings.defaultWashers) {
    console.log('Creating default data.');
    Meteor.settings.defaultWashers.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Washers', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Washers.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('WashersAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Washers.find();
  }
  return this.ready();
});
