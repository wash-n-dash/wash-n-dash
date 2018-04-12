import { Meteor } from 'meteor/meteor';
import { Machines } from '/imports/api/machine/machine';

/* eslint-disable no-console */

function createMachine(machineType, claimedForMinutes) {
  console.log(`  Creating ${machineType}.`);
  let date = new Date();
  date.setMinutes(date.getMinutes() + claimedForMinutes);

  const machineID = Machines.insert({
    machineType: machineType,
    freeAfter: date,
  });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Machines.find({}).count() === 0) {
  if (Meteor.settings.defaultMachines) {
    console.log('Creating the default machine(s)');
    Meteor.settings.defaultMachines.map(({ machineType, claimedForMinutes }) => createMachine( machineType, claimedForMinutes ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
