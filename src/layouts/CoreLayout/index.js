import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import CoreLayoutView from './CoreLayout';
import * as selectors from 'modules/auth/selectors';
import {getProfile, getIsFetching} from 'modules/profile/selectors';
import * as actions from 'modules/auth/actions';
import {connect as connectToNotifications} from 'modules/notifications/actions';
import queryString from 'query-string';

class CoreLayout extends Component {
  static propTypes = {
    finalizeAuth: PropTypes.func.isRequired,
    getTokenInfo: PropTypes.func.isRequired,
    signInWithToken: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object
  };

  componentWillMount() {
    const hash = queryString.parse(location.hash);
    if (hash.id_token) {
      this.signedWithToken = true;
      this.props.signInWithToken(hash.id_token);
    }
  }

  componentDidMount() {
    const {profile, isAuthenticated, finalizeAuth, getTokenInfo} = this.props;
    if (isAuthenticated && !this.signedWithToken) {
      getTokenInfo();
      finalizeAuth(profile);
    }
  }

  render() {
    return (
      <CoreLayoutView {...this.props} />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  profile: getProfile(state),
  isFetchingProfile: getIsFetching(state),
  isAuthenticated: selectors.getIsAuthenticated(state),
  isAuthenticating: selectors.getIsAuthenticating(state),
  isPlain: ownProps.routes && ownProps.routes.some(r => r.isPlain)
});

export default connect(mapStateToProps, {...actions, connectToNotifications})(CoreLayout);
