import { Meteor } from 'meteor/meteor';
import FacebookOAuthInit from './imports/oauth-facebook';

import '/imports/api/items';

Meteor.startup(() => {
  // code to run on server at startup
  FacebookOAuthInit();
});
