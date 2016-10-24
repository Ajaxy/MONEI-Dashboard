import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import ProfileView from '../components/ProfileView';

const mapStateToProps = (state, props) => ({
  user: profileSelectors.getProfile(state),
  userId: profileSelectors.getUserId(state),
  isAdmin: profileSelectors.getIsAdmin(state),
  isUsingAuth0UserPass: profileSelectors.getIsUsingAuth0UserPass(state),
  appMetadata: profileSelectors.getAppMetadata(state),
});

export default connect(mapStateToProps, actions)(ProfileView);
