import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Contacts } from '../../api/contact/contact.js';

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Contacts.insert(data);
}

/** Initialize the collection if empty. */
if (Contacts.find().count() === 0) {
  if (Meteor.settings.defaultContacts) {
    console.log('Creating default data.');
    Meteor.settings.defaultContacts.map(data => addData(data));
  }
}

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Contacts', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Contacts.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('ContactsAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Contacts.find();
  }
  return this.ready();
});
