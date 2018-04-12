import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Machines } from '../../api/machine/machine.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Machines', function publish() {
  return Machines.find({});
});
