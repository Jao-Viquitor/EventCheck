import { Meteor } from 'meteor/meteor';
import { Communities } from '../communities/communities';
import { People } from '../people/people';

Meteor.publish('communities', () => Communities.find());

Meteor.publish('people', () => People.find());

Meteor.publish('peopleForEvent', (eventId) =>
  People.find({ communityId: eventId })
);
