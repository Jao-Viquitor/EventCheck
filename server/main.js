import { Meteor } from 'meteor/meteor';
import { loadInitialData } from '../infra/initial-data';
import './methods';
import './publications';

Meteor.startup(async () => {
  // DON'T CHANGE THE NEXT LINE
  await loadInitialData();

  // YOU CAN DO WHATEVER YOU WANT HERE
});
