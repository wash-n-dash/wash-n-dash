import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Dryers = new Mongo.Collection('Dryers');

/** Create a schema to constrain the structure of documents associated with this collection. */
const DryerSchema = new SimpleSchema({
  dryerNumber: String,
  enabled: {
    type: String,
    allowedValues: ['Enabled', 'Disabled'],
    defaultValue: 'Enabled',
  },
  timeRemaining: String,
  owner: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Dryers.attachSchema(DryerSchema);

/** Make the collection and schema available to other code. */
export { Dryers, DryerSchema };
