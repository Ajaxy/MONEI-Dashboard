import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as actions from '../modules/actions';
import * as selectors from '../modules/selectors';
import * as profileSelectors from 'modules/profile/selectors';
import ProfileView from '../components/ProfileView';

class Profile extends Component {
  static propTypes = {
  };

  render() {
    return <ProfileView{...this.props} />;
  }
}

const mapStateToProps = (state, props) => ({
  user: profileSelectors.getProfile(state),
  userId: profileSelectors.getUserId(state),
  isAdmin: profileSelectors.getIsAdmin(state),
  appMetadata: profileSelectors.getAppMetadata(state),
});

export default connect(mapStateToProps, actions)(Profile);
