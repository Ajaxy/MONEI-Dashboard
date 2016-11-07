import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from 'modules/profile/selectors';
import ProfileView from '../components/ProfileView';

const mapStateToProps = (state, props) => ({
  profile: selectors.getProfile(state),
  userId: selectors.getUserId(state),
  isAdmin: selectors.getIsAdmin(state),
  isUser: selectors.getIsUser(state),
  isUsingAuth0UserPass: selectors.getIsUsingAuth0UserPass(state),
  appMetadata: selectors.getAppMetadata(state)
});

export default connect(mapStateToProps, actions)(ProfileView);
