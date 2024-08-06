import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { People } from '../people/people';

Meteor.methods({
  'people.checkIn'(personId) {
    check(personId, String);

    return People.updateAsync(personId, {
      $set: { checkInDate: new Date(), updatedAt: new Date() },
    });
  },

  'people.checkOut'(personId) {
    check(personId, String);

    return People.updateAsync(personId, {
      $set: { checkOutDate: new Date(), updatedAt: new Date() },
    });
  },
});
