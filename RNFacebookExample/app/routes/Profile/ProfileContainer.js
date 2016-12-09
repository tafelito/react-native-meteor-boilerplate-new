import React from 'react';
import Meteor, { createContainer } from 'react-native-meteor';
import { connect } from 'react-redux';

import Profile from './Profile';
import { logout } from '../../actions/authActions';

const mapStateToProps = (state, ownProps) => {
  // Pass meteor user to component
  // It'd be better to just send the properties needed ionstead of all the user object,
  // like profile (better for propTypes valdation)
  return {
    user: ownProps.user,
  };
};

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(logout());
  },
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

ProfileContainer.propTypes = {
  user: React.PropTypes.object.isRequired,
};

/*
*
* METEOR SPECIFIC
* In case we need to use any reactivity from Meteor, we use createContainer
*
*/
export default createContainer(() => {
  return {
    user: Meteor.user(),
  };
}, ProfileContainer);
