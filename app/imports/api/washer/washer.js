import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Washers = new Mongo.Collection('Washers');

/** Create a schema to constrain the structure of documents associated with this collection. */
const WasherSchema = new SimpleSchema({
  washerNumber: String,
  enabled: {
    type: String,
    allowedValues: ['Enabled', 'Disabled'],
    defaultValue: 'Enabled',
  },
  timeRemaining: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Washers.attachSchema(WasherSchema);

/** Make the collection and schema available to other code. */
export { Washers, WasherSchema };
