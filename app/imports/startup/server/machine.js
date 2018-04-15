import { Meteor } from 'meteor/meteor';
import { Machines } from '/imports/api/machine/machine';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.machineType} (${data.enabled})`);
  Machines.insert(data);
}

/** Initialize the collection if empty */
if (Machines.find({}).count() === 0) {
  if (Meteor.settings.defaultMachines) {
    console.log('Creating the default machines.');
    Meteor.settings.defaultMachines
        .map(data => addData(data));
    /* .map(({ machineType, claimedForMinutes }) => createMachine(machineType, claimedForMinutes)); */
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

Meteor.publish('Machines', function publish() {
  return Machines.find({});
});

/* function createMachine(machineType, claimedForMinutes) {
  console.log(`  Creating ${machineType}.`);
  const date = new Date();
  date.setMinutes(date.getMinutes() + claimedForMinutes);

  Machines.insert({
    machineType: machineType,
    freeAfter: date,
  });
} */
