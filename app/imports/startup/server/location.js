import { Meteor } from 'meteor/meteor';
import { Locations } from '/imports/api/location/location';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name}`);
  Locations.insert(data);
}

/** Initialize the collection if empty */
if (Locations.find({}).count() === 0) {
  if (Meteor.settings.defaultLocations) {
    console.log('Creating the default locations.');
    Meteor.settings.defaultLocations.map(data => addData(data));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

Meteor.publish('Locations', function publish() {
  return Locations.find({});
});
