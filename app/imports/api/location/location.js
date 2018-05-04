import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Create a Meteor collection. */
const Locations = new Mongo.Collection('Locations');

/** Create a schema to constrain the structure of documents associated with this collection. */
const LocationSchema = new SimpleSchema({
  name: {
    type: String,
    defaultValue: '',
  },
  lat: {
    type: Number,
    defaultValue: 0,
  },
  lng: {
    type: Number,
    defaultValue: 0,
  }
}, { tracker: Tracker });

/** Attach this schema to the collection. */
Locations.attachSchema(LocationSchema);

/** Make the collection and schema available to other code. */
export { Locations, LocationSchema };
