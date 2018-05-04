import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Machines = new Mongo.Collection('Machines');

/** Create a schema to constrain the structure of documents associated with this collection. */
const MachineSchema = new SimpleSchema({
  machineType: {
    type: String,
    allowedValues: ['Washer', 'Dryer'],
    defaultValue: 'Washer',
  },
  machineNumber: {
    type: Number,
    defaultValue: 0,
  },
  enabled: {
    type: String,
    allowedValues: ['enabled', 'disabled'],
    defaultValue: 'enabled',
  },
  timeRemaining: {
    type: Number,
    defaultValue: 0,
  },
  location: {
    type: String,
    defaultValue: 'Manoa',
    optional: true,
  },
  owner: {
    type: String,
    defaultValue: 'admin@foo.com',
  },
  secret: {
    type: String,
    defaultValue: '',
  }
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Machines.attachSchema(MachineSchema);

/** Make the collection and schema available to other code. */
export { Machines, MachineSchema };
