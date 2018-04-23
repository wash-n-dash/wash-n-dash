import { Meteor } from 'meteor/meteor';
import { Reports } from '../../api/report/report.js';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Reports', function publish() {
  if (this.userId) {
    return Reports.find();
  }
  return this.ready();
});

